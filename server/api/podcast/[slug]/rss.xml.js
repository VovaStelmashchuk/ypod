import { connectDB } from '~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const showSlug = getRouterParam(event, 'slug')

    const db = await connectDB()
    const show = await db.collection('shows').findOne({ slug: showSlug })

    await db.collection('shows').updateOne({ slug: showSlug }, { $inc: { rssDownloadCount: 1 } })

    const rss = show?.rss

    setResponseHeaders(event, {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
        'Content-Length': String(Buffer.from(rss).length)
    })

    if (event.req.method === 'HEAD') {
        setResponseStatus(event, 200)
        return ''
    }

    const readStream = new ReadableStream({
        start(controller) {
            controller.enqueue(Buffer.from(rss))
            controller.close()
        }
    })

    return readStream
})
