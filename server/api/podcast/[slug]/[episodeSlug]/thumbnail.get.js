import { connectDB } from '~/server/db/mongo'
import {
    BUCKET,
    getFileSizeInByte,
    openDownloadStream
} from '~/server/utils/files'

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const showSlug = getRouterParam(event, 'slug')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()
    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: showSlug, slug: episodeSlug })

    const thumbnail = episode?.image

    if (!thumbnail) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Thumbnail not found'
        })
    }

    const fileLength = await getFileSizeInByte(BUCKET.thumbnails, thumbnail)

    setResponseHeaders(event, {
        'Content-Type': 'image/jpg',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
        'Content-Length': String(fileLength)
    })

    if (method === 'HEAD') {
        event.node.res.statusCode = 200
        event.node.res.end()
        return
    }

    const readStream = await openDownloadStream(BUCKET.thumbnails, thumbnail)
    return readStream
})
