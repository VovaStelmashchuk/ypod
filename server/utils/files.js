import { GridFSBucket } from 'mongodb'
import { connectDB } from '~~/server/db/mongo'

export const BUCKET = {
    showLogo: 'show_logos',
    thumbnails: 'thumbnails',
    audio: 'audio'
}

const buckets = {}

/**
 * @param bucketname {string}
 * @returns {Promise<GridFSBucket>}
 */
async function getBucket(bucketName) {
    if (buckets[bucketName]) {
        return buckets[bucketName]
    }
    const db = await connectDB()
    const bucket = new GridFSBucket(db, {
        bucketName: bucketName
    })
    return bucket
}

/**
 * @param bucket {object}
 * @param filename {string}
 * @param url {string}
 */
export async function downloadFile(bucketName, filename, url, headers = {}) {
    console.info(
        `Downloading file from ${url} to bucket ${bucketName} with filename ${filename}`
    )
    const bucket = await getBucket(bucketName)

    const response = await $fetch(new URL(url), {
        responseType: 'arrayBuffer',
        headers: headers
    })

    const buffer = Buffer.from(response)

    await dropFile(bucketName, filename)

    await new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename)
        uploadStream.write(buffer)
        uploadStream.end()

        uploadStream.on('finish', async () => {
            console.log(`File ${filename} saved into bucket`)
            resolve()
        })

        uploadStream.on('error', (err) => {
            console.error('Error uploading file:', err)
            reject(err)
        })
    })
}

export async function dropFile(bucketName, fileName) {
    console.info('Deleting file ', fileName, ' from bucket ', bucketName)

    const bucket = await getBucket(bucketName)

    const oldFiles = await bucket.find({ filename: fileName }).toArray()

    for (const file of oldFiles) {
        await bucket.delete(file._id)
    }
}

export async function getFileSizeInByte(bucketName, fileName) {
    console.info('Getting file size for ', fileName, ' in bucket ', bucketName)

    const bucket = await getBucket(bucketName)

    const files = await bucket.find({ filename: fileName }).toArray()

    if (files.length === 0) {
        throw new Error(`File ${fileName} not found in bucket`)
    }

    const file = files[0]
    return file.length
}
/**
 * @param bucketName {string}
 * @param fileName {string}
 * @param options {object} optional { start: Number, end: Number }
 * @returns {Promise<GridFSBucketReadStream>}
 */
export async function openDownloadStream(bucketName, fileName, options = {}) {
    console.info(
        `Opening download stream for ${fileName} in bucket ${bucketName}, options ${options}`
    )

    const bucket = await getBucket(bucketName)
    return bucket.openDownloadStreamByName(fileName, options)
}

/**
 * Uploads a file to the specified bucket.
 *
 * @param bucketName {string} - The name of the bucket.
 * @param filename {string} - The name of the file to upload.
 * @param fileBuffer {Buffer} - The file data as a buffer.
 */
export async function uploadFile(bucketName, filename, fileBuffer) {
    console.info(
        `Uploading file to bucket ${bucketName} with filename ${filename}`
    )

    const bucket = await getBucket(bucketName)

    // Remove the existing file if it exists
    await dropFile(bucketName, filename)

    // Upload the new file
    await new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename)
        uploadStream.write(fileBuffer)
        uploadStream.end()

        uploadStream.on('finish', () => {
            console.log(`File ${filename} uploaded to bucket ${bucketName}`)
            resolve()
        })

        uploadStream.on('error', (err) => {
            console.error('Error uploading file:', err)
            reject(err)
        })
    })
}

/**
 * Uploads a file to GridFS from multiple chunk files.
 *
 * @param bucketName {string} - The name of the bucket.
 * @param filename {string} - The name of the file to upload.
 * @param chunksDir {string} - The directory containing the chunk files.
 * @param totalChunks {number} - The total number of chunks.
 * @returns {Promise<import('mongodb').ObjectId>} - The GridFS file ID
 */
export async function uploadFileFromChunks(bucketName, filename, chunksDir, totalChunks) {
    console.info(
        `Uploading file from chunks to bucket ${bucketName} with filename ${filename}, totalChunks: ${totalChunks}`
    )

    const bucket = await getBucket(bucketName)
    const fs = await import('fs/promises')
    const path = await import('path')

    // Remove the existing file if it exists
    await dropFile(bucketName, filename)

    // Upload the new file by reading chunks sequentially
    return new Promise(async (resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename)

        try {
            // Read and write chunks in order
            for (let i = 0; i < totalChunks; i++) {
                const chunkPath = path.join(chunksDir, String(i))
                const chunkBuffer = await fs.readFile(chunkPath)
                uploadStream.write(chunkBuffer)
            }
            uploadStream.end()

            uploadStream.on('finish', () => {
                console.log(`File ${filename} uploaded to bucket ${bucketName} from chunks`)
                resolve(uploadStream.id)
            })

            uploadStream.on('error', (err) => {
                console.error('Error uploading file from chunks:', err)
                reject(err)
            })
        } catch (err) {
            console.error('Error reading chunk files:', err)
            uploadStream.destroy()
            reject(err)
        }
    })
}
