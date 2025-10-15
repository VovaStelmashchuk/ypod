import { connectDB, getAvatarBucket } from '~/server/db/mongo'

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const userId = event.context?.auth?.userId
    if (!userId) {
        setResponseStatus(401)
        return
    }

    const db = await connectDB()
    const avatarBucket = await getAvatarBucket()

    const user = await db
        .collection('users')
        .findOne({ id: userId }, { projection: { avatarFileName: 1 } })

    const avatar = user?.avatarFileName
    if (!avatar) {
        setResponseStatus(404)
        return
    }

    // Get file size for Content-Length header
    const files = await avatarBucket.find({ filename: avatar }).toArray()
    const fileLength = files.length > 0 ? files[0].length : 0

    setResponseHeaders(event, {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
        'Content-Length': String(fileLength)
    })

    if (method === 'HEAD') {
        event.node.res.statusCode = 200
        event.node.res.end()
        return
    }

    const readStream = avatarBucket.openDownloadStreamByName(avatar)
    return readStream
})
