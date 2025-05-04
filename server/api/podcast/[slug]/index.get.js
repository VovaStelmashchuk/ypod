import { connectDB } from '~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    const db = await connectDB()
    const show = await db.collection('shows').findOne({ slug: slug })

    const episodes = await db
        .collection('episodes')
        .find({ showSlug: slug })
        .sort({ position: 1 })
        .toArray()

    const uiModel = episodes.map((episode) => ({
        slug: episode.slug,
        title: episode.title,
        description: episode.description,
        image: `/api/podcast/${slug}/${episode.slug}/thumbnail`
    }))

    return {
        showName: show.showName,
        links: show.links,
        episodes: uiModel
    }
})
