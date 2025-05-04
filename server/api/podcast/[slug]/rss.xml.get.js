import { connectDB } from '~/server/db/mongo'
import { BUCKET, openDownloadStream } from '~/server/utils/files'

export default defineEventHandler(async (event) => {
    const showSlug = getRouterParam(event, 'slug')

    const db = await connectDB()
    const show = await db.collection('shows').findOne({ slug: showSlug })

    const rss = show?.rss

    const readStream = new ReadableStream({
        start(controller) {
            controller.enqueue(Buffer.from(rss))
            controller.close()
        }
    })

    setResponseHeaders(event, {
        'Content-Type': 'application/rss+xml'
        //'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return readStream
})
