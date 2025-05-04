import { connectDB } from '../db/mongo'
import { downloadFile, BUCKET } from '../utils/files'

export default defineNitroPlugin(async (_) => {
    console.info(
        'Podcast episode image sync plugin start',
        new Date().toISOString()
    )
    const db = await connectDB()

    while (true) {
        const video = await db
            .collection('episodes')
            .findOneAndUpdate(
                { imageSyncStatus: 'pending' },
                { $set: { imageSyncStatus: 'in-progress' } },
                { returnDocument: 'before' }
            )
        if (video) {
            console.info(
                'Syncing image for video',
                video._id,
                new Date().toISOString()
            )
            await syncImage(db, video)
        } else {
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }
    }
})

async function syncImage(db, video) {
    try {
        const thumbnailFileName = `${video.slug}.jpg`
        await downloadFile(
            BUCKET.thumbnails,
            thumbnailFileName,
            video.thumbnailUrl
        )
        await db.collection('episodes').updateOne(
            { _id: video._id },
            {
                $set: {
                    imageSyncStatus: 'done',
                    imageSyncError: null,
                    image: thumbnailFileName
                }
            }
        )
    } catch (error) {
        console.error('Failed to sync image for video', video._id, error)

        await db.collection('episodes').updateOne(
            { _id: video._id },
            {
                $set: {
                    imageSyncStatus: 'error',
                    imageSyncError: error.message
                }
            }
        )
    }
}
