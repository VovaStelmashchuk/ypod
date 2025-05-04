import { connectDB } from '~/server/db/mongo'
import { BUCKET, openDownloadStream } from '~/server/utils/files'

export default defineEventHandler(async (event) => {
    const showSlug = getRouterParam(event, 'slug')

    const db = await connectDB()
    const episode = await db.collection('shows').findOne({ slug: showSlug })

    const logo = episode?.logo

    const readStream = await openDownloadStream(BUCKET.showLogo, logo)

    setResponseHeaders(event, {
        'Content-Type': 'image/jpg',
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return readStream
})
