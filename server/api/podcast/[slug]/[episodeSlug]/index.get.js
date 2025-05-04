import { connectDB } from '~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const db = await connectDB()

    let showSlug = getRouterParam(event, 'slug')

    if (showSlug === '--auto-slug--') {
        const host = event.node.req.headers.host
        const show = await db.collection('shows').findOne({ domains: host })
        showSlug = show.slug
    }
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: showSlug, slug: episodeSlug })

    const show = await db.collection('shows').findOne({ slug: showSlug })

    return {
        showName: show.showName,
        links: show.links,
        slug: episode.slug,
        description: episode.shortDescription,
        title: episode.title,
        youtubeVideoId: episode.youtubeVideoId,
        audioUrl: `/api/podcast/${showSlug}/${episodeSlug}/audio.mp3`
    }
})
