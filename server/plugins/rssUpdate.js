import { updateRss } from '../core/generator'
import { connectDB } from '../db/mongo'

export default defineNitroPlugin(async (_) => {
    console.info('Podcast rss sync start', new Date().toISOString())
    const db = await connectDB()

    while (true) {
        const show = await db
            .collection('shows')
            .findOneAndUpdate(
                { rssStatusSync: 'pending' },
                { $set: { rssStatusSync: 'in-progress' } },
                { returnDocument: 'before' }
            )
        if (show) {
            console.info(
                `Syncing rss for show ${show.slug}`,
                new Date().toISOString()
            )
            try {
                await updateRss(show.slug)
                await db.collection('shows').updateOne(
                    { _id: show._id },
                    {
                        $set: {
                            rssStatusSync: 'done',
                            rssSyncError: null
                        }
                    }
                )
            } catch (error) {
                console.error('Failed to sync rss for show', show.slug, error)
                await db.collection('shows').updateOne(
                    { _id: show._id },
                    {
                        $set: {
                            rssStatusSync: 'error',
                            rssSyncError: error.message
                        }
                    }
                )
            }
        } else {
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }
    }
})
