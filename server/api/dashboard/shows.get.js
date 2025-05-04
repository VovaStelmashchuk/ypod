import { connectDB } from '~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(401)
        return
    }

    const db = await connectDB()

    const shows = await db
        .collection('shows')
        .find({ owners: userId })
        .toArray()

    const resultShows = shows.map((show) => {
        return {
            slug: show.slug,
            name: show.showName
        }
    })

    return {
        shows: resultShows
    }
})
