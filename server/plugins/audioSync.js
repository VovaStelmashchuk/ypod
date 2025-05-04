import { connectDB } from '../db/mongo'
import { getRapidApiKey } from '../utils/config'
import { downloadFile, BUCKET } from '../utils/files'

const rapidApiKey = getRapidApiKey()

export default defineNitroPlugin(async (_) => {
    console.info(
        'Podcast episode audio sync plugin start',
        new Date().toISOString()
    )
    const db = await connectDB()

    while (true) {
        const episode = await db
            .collection('episodes')
            .findOneAndUpdate(
                { audioSyncStatus: 'pending' },
                { $set: { audioSyncStatus: 'in-progress' } },
                { returnDocument: 'before' }
            )
        if (episode) {
            console.info(
                'Syncing audio for episode',
                episode._id,
                new Date().toISOString()
            )
            await syncAudio(db, episode)
        } else {
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }
    }
})

async function syncAudio(db, episode) {
    try {
        const body = {
            url: `https://www.youtube.com/watch?v=${episode.youtubeVideoId}`
        }
        const youtubeToMp3Response = await $fetch(
            `https://youtube-to-mp335.p.rapidapi.com/api/converttomp3`,
            {
                method: 'POST',
                body: body,
                headers: {
                    'x-rapidapi-host': 'youtube-to-mp335.p.rapidapi.com',
                    'x-rapidapi-key': rapidApiKey
                }
            }
        )

        console.info('youtube to mp3 response', youtubeToMp3Response)

        const audioDownloadUrl = youtubeToMp3Response.url
        const duration = youtubeToMp3Response.duration
        const audioFileName = `${episode.slug}.mp3`

        await downloadFile(BUCKET.audio, audioFileName, audioDownloadUrl)

        await db.collection('episodes').updateOne(
            { _id: episode._id },
            {
                $set: {
                    audioSyncStatus: 'done',
                    audioSyncError: null,
                    duration: duration,
                    audio: audioFileName
                }
            }
        )
    } catch (error) {
        console.error('Failed to sync audio for episode', episode._id, error)

        await db.collection('episodes').updateOne(
            { _id: episode._id },
            {
                $set: {
                    audioSyncStatus: 'error',
                    audioSyncError: error.message
                }
            }
        )
    }
}
