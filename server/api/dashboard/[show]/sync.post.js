import { syncPlayList } from '~~/server/core/sync'
import { connectDB } from '~~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(401)
        return
    }
    const showSlug = getRouterParam(event, 'show')

    const db = await connectDB()

    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        return
    }

    await syncPlayList(show.slug)
})
