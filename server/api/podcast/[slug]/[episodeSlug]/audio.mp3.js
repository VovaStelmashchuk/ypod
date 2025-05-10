import { connectDB } from '~/server/db/mongo'
import {
    BUCKET,
    getFileSizeInByte,
    openDownloadStream
} from '~/server/utils/files'

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const showSlug = getRouterParam(event, 'slug')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()
    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: showSlug, slug: episodeSlug })

    const audio = episode?.audio

    if (!audio) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Audio not found'
        })
    }

    const fileLength = await getFileSizeInByte(BUCKET.audio, audio)
    const range = event.node.req.headers.range
    let start = 0
    let end = fileLength - 1

    console.log('Audio file length:', fileLength)

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        start = parseInt(parts[0], 10)
        end = parts[1] ? parseInt(parts[1], 10) : end

        if (start >= fileLength || end >= fileLength) {
            event.node.res.writeHead(416, {
                'Content-Range': `bytes */${fileLength}`
            })
            return ''
        }

        event.node.res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileLength}`,
            'Content-Length': end - start + 1,
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400',
            'Accept-Ranges': 'bytes'
        })
    } else {
        setResponseHeaders(event, {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400',
            'Accept-Ranges': 'bytes',
            'Content-Length': String(fileLength)
        })
    }

    if (method === 'HEAD') {
        event.node.res.statusCode = 200
        return ''
    }

    const readStream = await openDownloadStream(BUCKET.audio, audio, {
        start: start,
        end: end + 1
    })
    return readStream
})
