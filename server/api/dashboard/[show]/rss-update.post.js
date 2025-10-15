import { connectDB } from '~~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(event, 401)
        return { error: 'Unauthorized' }
    }

    const showSlug = getRouterParam(event, 'show')

    const db = await connectDB()

    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        setResponseStatus(event, 404)
        return { error: 'Show not found' }
    }

    await db.collection('shows').updateOne(
        { _id: show._id },
        {
            $set: {
                rssStatusSync: 'pending',
                rssSyncError: null
            }
        }
    )

    return { success: true, message: 'RSS sync status updated to pending' }
})

