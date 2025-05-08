import { connectDB } from '~~/server/db/mongo'

import { uploadFile, BUCKET } from '~~/server/utils/files'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(401)
        return
    }
    const showSlug = getRouterParam(event, 'show')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()

    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        return
    }

    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: show.slug, slug: episodeSlug })

    const fields = await readMultipartFormData(event)

    const audioFiles = fields.filter((field) => field.name === 'audio')

    const audioFile = audioFiles[0]

    const fileBuffer = audioFile.data
    const audioFileName = `${episode.slug}.mp3`

    await uploadFile(BUCKET.audio, audioFileName, fileBuffer)

    await db.collection('episodes').updateOne(
        { showSlug: show.slug, slug: episodeSlug },
        {
            $set: {
                audio: audioFileName
            }
        }
    )

    return {
        status: 200,
        message: 'File uploaded successfully',
        fileName: audioFileName
    }
})
