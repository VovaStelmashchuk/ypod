import { connectDB } from '~/server/db/mongo'
import { BUCKET, openDownloadStream } from '~/server/utils/files'

export default defineEventHandler(async (event) => {
    const showSlug = getRouterParam(event, 'slug')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()
    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: showSlug, slug: episodeSlug })

    const audio = episode?.audio

    if (!audio) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Audio not found'
        })
    }

    const readStream = await openDownloadStream(BUCKET.audio, audio)

    setResponseHeaders(event, {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return readStream
})
