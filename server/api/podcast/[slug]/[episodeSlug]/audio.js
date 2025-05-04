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

    const audio = episode?.audio

    if (!audio) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Audio not found'
        })
    }

    const fileLength = await getFileSizeInByte(BUCKET.audio, audio)

    setResponseHeaders(event, {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'Accept-Ranges': 'bytes',
        'Content-Length': String(fileLength)
    })
    if (method === 'HEAD') {
        return ''
    }
    const readStream = await openDownloadStream(BUCKET.audio, audio)
    return readStream
})
