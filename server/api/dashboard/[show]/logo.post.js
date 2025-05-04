import { readMultipartFormData } from 'h3'
import { BUCKET, uploadFile } from '~~/server/utils/files'
import { connectDB } from '~~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(401)
        return
    }
    const showSlug = getRouterParam(event, 'show')

    const db = await connectDB()

    const show = await db
        .collection('shows')
        .findOne({ owners: userId, slug: showSlug })

    if (!show) {
        return
    }

    const fields = await readMultipartFormData(event)

    const logoFiles = fields.filter((field) => field.name === 'logo')

    if (logoFiles.length !== 1) {
        throw createError({
            statusCode: 400,
            message: 'File logo is required'
        })
    }

    const logoFile = logoFiles[0]

    const fileBuffer = logoFile.data
    const logoFileName = `${show.slug}.jpg`

    await uploadFile(BUCKET.showLogo, logoFileName, fileBuffer)

    await db.collection('shows').updateOne(
        { _id: show._id },
        {
            $set: {
                logo: logoFileName
            }
        }
    )
})
