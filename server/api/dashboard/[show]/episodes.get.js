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

    const episodes = await db
        .collection('episodes')
        .find({ showSlug: show.slug })
        .sort({ position: 1 })
        .toArray()

    return {
        showName: show.showName,
        episodes: episodes.map((episode) => ({
            title: episode.title,
            slug: episode.slug,
            image: `/api/podcast/${showSlug}/${episode.slug}/thumbnail`
        }))
    }
})
