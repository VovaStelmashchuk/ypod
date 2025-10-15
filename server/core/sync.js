import standardSlugify from 'standard-slugify'
import { connectDB } from '../db/mongo'
import { google } from 'googleapis'

const youtubeApiKey = useRuntimeConfig().youtubeApiKey

export async function syncPlayList(showSlug) {
    const db = await connectDB()

    const show = await db.collection('shows').findOne({ slug: showSlug })
    const playlistId = show?.youtubePlaylistId

    const originPlaylistItems = await getPlaylistItems(playlistId)

    let isFirst = true

    // Get all video IDs and fetch their durations
    const videoIds = originPlaylistItems.map(item => item.snippet.resourceId.videoId);
    const durations = await getVideoDurations(videoIds);

    const playlistItems = originPlaylistItems.map((item) => {
        let thumbnail = item.snippet.thumbnails.maxres
        if (!thumbnail) {
            thumbnail = item.snippet.thumbnails.standard
        }
        if (!thumbnail) {
            console.error('Thumbnails not found', item.snippet)
        }
        if (isFirst) {
            console.log(item)
            isFirst = false
        }
        const videoId = item.snippet.resourceId.videoId;
        const isoDuration = durations[videoId];

        return {
            title: item.snippet.title,
            youtubeVideoId: videoId,
            position: item.snippet.position,
            description: item.snippet.description,
            thumbnailUrl: thumbnail?.url,
            youtubeDuration: isoDuration,
            duration: parseISO8601Duration(isoDuration),
            pubDate: item.snippet.publishedAt
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
        audioSyncStatus: 'pending',
        youtubeDuration: video.youtubeDuration,
        duration: video.duration
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
                description: video.description,
                youtubeDuration: video.youtubeDuration,
                duration: video.duration,
                pubDate: video.pubDate
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

// Helper to fetch durations
async function getVideoDurations(youtubeVideoIds) {
    if (!youtubeVideoIds.length) return {};
    const youtube = google.youtube({
        version: 'v3',
        auth: youtubeApiKey
    });

    const result = {};
    for (let i = 0; i < youtubeVideoIds.length; i += 50) {
        const ids = youtubeVideoIds.slice(i, i + 50);
        const response = await youtube.videos.list({
            part: ['contentDetails'],
            id: ids
        });
        for (const item of response.data.items) {
            result[item.id] = item.contentDetails.duration;
        }
    }
    return result;
}

function parseISO8601Duration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
}
