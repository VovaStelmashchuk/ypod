import standardSlugify from 'standard-slugify'
import { connectDB } from '../db/mongo'
import { getYoutubeApiKey } from '../utils/config'
import { google } from 'googleapis'

const youtubeApiKey = getYoutubeApiKey()

export async function syncPlayList(showSlug) {
    const db = await connectDB()

    const show = await db.collection('shows').findOne({ slug: showSlug })
    const playlistId = show?.youtubePlaylistId

    const originPlaylistItems = await getPlaylistItems(playlistId)

    const playlistItems = originPlaylistItems.map((item) => {
        let thumbnail = item.snippet.thumbnails.maxres
        if (!thumbnail) {
            thumbnail = item.snippet.thumbnails.standard
        }
        if (!thumbnail) {
            console.error('Thumbnails not found', item.snippet)
        }
        return {
            title: item.snippet.title,
            youtubeVideoId: item.snippet.resourceId.videoId,
            position: item.snippet.position,
            description: item.snippet.description,
            thumbnailUrl: thumbnail?.url
        }
    })

    const existVideos = await db
        .collection('episodes')
        .find({ showSlug: showSlug })
        .toArray()

    const videoToUpdate = playlistItems.filter((video) => {
        return existVideos.some(
            (item) => item.youtubeVideoId === video.youtubeVideoId
        )
    })

    for (const video of videoToUpdate) {
        await updateVideo(db, video)
    }

    const videoToCreate = playlistItems.filter((item) => {
        return !existVideos.some(
            (video) => item.youtubeVideoId === video.youtubeVideoId
        )
    })

    for (const video of videoToCreate) {
        await createVideo(db, showSlug, video)
    }
}

async function createVideo(db, showSlug, video) {
    await db.collection('episodes').insertOne({
        showSlug: showSlug,
        slug: standardSlugify(video.title) + '-' + video.youtubeVideoId,
        title: video.title,
        youtubeVideoId: video.youtubeVideoId,
        thumbnailUrl: video.thumbnailUrl,
        position: video.position,
        description: video.description,
        imageSyncStatus: 'pending',
        audioSyncStatus: 'pending'
    })
}

async function updateVideo(db, video) {
    const youtubeVideoId = video.youtubeVideoId
    db.collection('episodes').updateOne(
        { youtubeVideoId: youtubeVideoId },
        {
            $set: {
                title: video.title,
                thumbnailUrl: video.thumbnailUrl,
                position: video.position,
                description: video.description
            }
        }
    )
}

async function getPlaylistItems(playlistId) {
    let nextPageToken = null
    let items = []

    do {
        const response = await getPlaylistPage(playlistId, nextPageToken)
        items = items.concat(response.items)
        nextPageToken = response.nextPageToken
    } while (nextPageToken)

    return items
}

async function getPlaylistPage(playlistId, nextPageToken) {
    const youtube = google.youtube({
        version: 'v3',
        auth: youtubeApiKey
    })

    const response = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: playlistId,
        maxResults: 50,
        pageToken: nextPageToken
    })

    return response.data
}
