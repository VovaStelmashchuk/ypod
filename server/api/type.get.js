import { connectDB } from '~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const host = event.node.req.headers.host

    let type = null
    let podcastSlug = null
    const db = await connectDB()
    const show = await db.collection('shows').findOne({ domains: host })

    if (show) {
        type = 'podcast'
        podcastSlug = show?.slug
    } else {
        type = 'lending'
        podcastSlug = null
    }

    return {
        type: type,
        podcastSlug: podcastSlug
    }
})
