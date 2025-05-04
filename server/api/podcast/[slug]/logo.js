import { connectDB } from '~/server/db/mongo'
import { BUCKET, openDownloadStream } from '~/server/utils/files'

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const showSlug = getRouterParam(event, 'slug')

    const db = await connectDB()
    const episode = await db.collection('shows').findOne({ slug: showSlug })

    const logo = episode?.logo
    if (!logo) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Logo not found'
        })
    }

    const fileLength = await getFileSizeInByte(BUCKET.showLogo, logo)

    setResponseHeaders(event, {
        'Content-Type': 'image/jpg',
        'Cache-Control': 'public, max-age=86400',
        'Accept-Ranges': 'bytes',
        'Content-Length': String(fileLength)
    })

    if (method === 'HEAD') {
        return ''
    }
    const readStream = await openDownloadStream(BUCKET.showLogo, logo)
    return readStream
})
