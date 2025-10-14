import { connectDB } from '~~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(event, 401)
        return
    }
    const showSlug = getRouterParam(event, 'show')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()

    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        setResponseStatus(event, 404)
        return { error: 'Show not found' }
    }

    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: show.slug, slug: episodeSlug })

    if (!episode) {
        setResponseStatus(event, 404)
        return { error: 'Episode not found' }
    }

    return {
        showName: show.showName,
        showSlug: show.slug,
        episode: {
            slug: episode.slug,
            title: episode.title,
            description: episode.description,
            shortDescription: episode.shortDescription,
            youtubeVideoId: episode.youtubeVideoId,
            image: `/api/podcast/${showSlug}/${episodeSlug}/thumbnail`,
            audioUrl: `/api/podcast/${showSlug}/${episodeSlug}/audio.mp3`,
            hasAudio: !!episode.audio,
            position: episode.position,
            createdAt: episode.createdAt,
            updatedAt: episode.updatedAt
        }
    }
})

