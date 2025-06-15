import { defineEventHandler } from 'h3'
import { connectDB } from '~~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId || 'anonymous'
    const db = await connectDB()

    let isDbConnected = false

    try {
        await db.command({ ping: 1 })
        isDbConnected = true
    } catch (e) {
        console.error(e)
    }

    let commitSha = 'init unknown'

    try {
        commitSha = useRuntimeConfig().public.gitCommitSha
    } catch (e) {
        console.error(e)
        commitSha = `Error getting commit sha ${e}`
    }

    return {
        userId: userId,
        commitSha: commitSha,
        isDbConnected: isDbConnected
    }
})
