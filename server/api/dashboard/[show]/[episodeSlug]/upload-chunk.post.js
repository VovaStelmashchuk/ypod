import { promises as fs } from 'fs'
import path from 'path'
import { connectDB } from '~~/server/db/mongo'
import { uploadFileFromChunks, BUCKET } from '~~/server/utils/files'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const showSlug = getRouterParam(event, 'show')
    const episodeSlug = getRouterParam(event, 'episodeSlug')

    const db = await connectDB()

    // Verify user owns the show
    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        throw createError({
            statusCode: 404,
            message: 'Show not found'
        })
    }

    // Verify episode exists
    const episode = await db
        .collection('episodes')
        .findOne({ showSlug: show.slug, slug: episodeSlug })

    if (!episode) {
        throw createError({
            statusCode: 404,
            message: 'Episode not found'
        })
    }

    // Parse multipart form data
    const formData = await readMultipartFormData(event)

    const uploadId = formData?.find(p => p.name === 'uploadId')?.data.toString()
    const chunkIndex = formData?.find(p => p.name === 'chunkIndex')?.data.toString()
    const totalChunks = formData?.find(p => p.name === 'totalChunks')?.data.toString()
    const originalFilename = formData?.find(p => p.name === 'originalFilename')?.data.toString()
    const chunkData = formData?.find(p => p.name === 'fileChunk')

    if (!uploadId || chunkIndex === undefined || !totalChunks || !chunkData || !originalFilename) {
        throw createError({
            statusCode: 400,
            message: 'Missing upload data'
        })
    }

    const totalChunksNum = parseInt(totalChunks, 10)
    const chunkIndexNum = parseInt(chunkIndex, 10)

    // Save chunk to temporary directory
    const tempUploadDir = path.join(process.cwd(), '.temp-uploads')
    await fs.mkdir(tempUploadDir, { recursive: true })

    const chunkDir = path.join(tempUploadDir, uploadId)
    await fs.mkdir(chunkDir, { recursive: true })

    const chunkPath = path.join(chunkDir, chunkIndex)
    await fs.writeFile(chunkPath, chunkData.data)

    console.log(`Chunk ${chunkIndex}/${totalChunks} saved for upload ${uploadId}`)

    // Check if all chunks have been uploaded
    const existingChunks = await fs.readdir(chunkDir)
    const isLastChunk = existingChunks.length === totalChunksNum

    if (isLastChunk) {
        console.log(`All chunks received for upload ${uploadId}. Starting merge to GridFS...`)

        try {
            // Merge chunks into GridFS
            const audioFileName = `${episode.slug}.mp3`
            const fileId = await uploadFileFromChunks(
                BUCKET.audio,
                audioFileName,
                chunkDir,
                totalChunksNum
            )

            // Update episode document
            await db.collection('episodes').updateOne(
                { showSlug: show.slug, slug: episodeSlug },
                {
                    $set: {
                        audio: audioFileName
                    }
                }
            )

            // Clean up temporary files
            await fs.rm(chunkDir, { recursive: true, force: true })

            console.log(`Upload ${uploadId} completed successfully`)

            return {
                status: 'complete',
                fileId: fileId.toString(),
                fileName: audioFileName
            }
        } catch (error) {
            console.error('Error merging chunks to GridFS:', error)
            // Clean up on failure
            try {
                await fs.rm(chunkDir, { recursive: true, force: true })
            } catch (cleanupError) {
                console.error('Error cleaning up chunks:', cleanupError)
            }
            throw createError({
                statusCode: 500,
                message: 'File processing failed'
            })
        }
    }

    return {
        status: 'chunk-received',
        chunkIndex: chunkIndexNum
    }
})

