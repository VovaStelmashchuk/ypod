import { connectDB } from '~~/server/db/mongo'

import { dropFile, BUCKET } from '~~/server/utils/files'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(401)
        return
    }
    const showSlug = getRouterParam(event, 'show')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()

    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        return
    }

    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: show.slug, slug: episodeSlug })

    await dropFile(BUCKET.thumbnails, episode.image)
    await dropFile(BUCKET.audio, episode.audio)

    await db.collection('episodes').deleteOne({ _id: episode._id })

    return
})
