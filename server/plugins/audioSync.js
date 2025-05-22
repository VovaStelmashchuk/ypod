import { connectDB } from '../db/mongo'
import { getRapidApiKey } from '../utils/config'
import { downloadFile, BUCKET } from '../utils/files'

const rapidApiKey = getRapidApiKey()

export default defineNitroPlugin(async (_) => {
    console.info(
        'Podcast episode audio sync plugin start',
        new Date().toISOString()
    )
    const db = await connectDB()

    while (true) {
        const episode = await db
            .collection('episodes')
            .findOneAndUpdate(
                { audioSyncStatus: 'pending' },
                { $set: { audioSyncStatus: 'in-progress' } },
                { returnDocument: 'before' }
            )
        if (episode) {
            console.info(
                'Syncing audio for episode',
                episode.slug,
                new Date().toISOString()
            )
            await syncAudio(db, episode)
        } else {
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }
    }
})

async function syncAudio(db, episode) {
    try {
        const youtubeVideoInfo = await getYoutubeInfo(episode.youtubeVideoId, episode.slug, db)
        const audioDownloadUrl = youtubeVideoInfo.audioUrl

        const duration = youtubeVideoInfo.duration
        const audioFileName = `${episode.slug}.mp3`

        await downloadFile(BUCKET.audio, audioFileName, audioDownloadUrl)

        await db.collection('episodes').updateOne(
            { slug: episode.slug },
            {
                $set: {
                    audioSyncStatus: 'done',
                    audioSyncError: null,
                    duration: duration,
                    audio: audioFileName
                }
            }
        )
    } catch (error) {
        console.error('Failed to sync audio for episode', episode.slug, error)

        await db.collection('episodes').updateOne(
            { slug: episode.slug },
            {
                $set: {
                    audioSyncStatus: 'error',
                    audioSyncError: error.message
                }
            }
        )
    }
}

async function getYoutubeInfo(youtubeVideoId, episodeSlug, db) {
    try {
        return await getYoutubeLinkByYoutubeToMp3(youtubeVideoId, episodeSlug, db)
    } catch (error) {
        await addEpisodeLog(db, episodeSlug, 'error', `Failed to get youtube download link by youtube-to-mp335`);
        try {
            return await getYoutubeLinkByYoutubeMp36(youtubeVideoId, episodeSlug, db)
        } catch (error) {
            await addEpisodeLog(db, episodeSlug, 'error', `Failed to get youtube download link by youtube-mp36`);
            throw error
        }
    }
}

//youtube-to-mp335
async function getYoutubeLinkByYoutubeToMp3(youtubeVideoId, episodeSlug, db) {
    await addEpisodeLog(db, episodeSlug, 'info', `Getting youtube link by youtube-to-mp335`);
    const body = {
        url: `https://www.youtube.com/watch?v=${youtubeVideoId}`
    }
    const youtubeToMp3Response = await $fetch(
        `https://youtube-to-mp335.p.rapidapi.com/api/converttomp3`,
        {
            method: 'POST',
            body: body,
            headers: {
                'x-rapidapi-host': 'youtube-to-mp335.p.rapidapi.com',
                'x-rapidapi-key': rapidApiKey
            }
        }
    )

    console.info('youtube to mp3 response', youtubeToMp3Response)

    await addEpisodeLog(db, episodeSlug, 'info', `Youtube to mp3 response: ${JSON.stringify(youtubeToMp3Response)}`);

    return {
        audioUrl: youtubeToMp3Response.url,
        duration: youtubeToMp3Response.duration
    }
}

//youtube-mp36
async function getYoutubeLinkByYoutubeMp36(youtubeVideoId, episodeSlug, db) {
    await addEpisodeLog(db, episodeSlug, 'info', `Getting youtube link by youtube-mp36`);
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${youtubeVideoId}`;
    const headers = {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
    };

    const maxAttempts = 10;
    let attempt = 0;

    while (attempt < maxAttempts) {
        attempt++;
        // Log the attempt
        await addEpisodeLog(db, episodeSlug, 'info', `Attempt ${attempt}: Trying to get audio URL from youtube-mp36`);

        try {
            const response = await $fetch(url, {
                method: 'GET',
                headers
            });

            console.info('youtube-mp36 response', response);

            // Log the response
            await addEpisodeLog(db, episodeSlug, 'info', `Attempt ${attempt}: Received response: ${JSON.stringify(response)}`);

            if (response.status === 'ok' && response.link) {
                return {
                    audioUrl: response.link,
                    duration: response.duration
                }
            }

            // Wait for 1 minute before retrying
            await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
        } catch (error) {
            console.error('Failed to get youtube-mp36 link', error);
            // Log the error
            await addEpisodeLog(db, episodeSlug, 'error', `Attempt ${attempt}: Error occurred: ${error.message}`);
            await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
        }
    }

    // Log the final failure
    await addEpisodeLog(db, episodeSlug, 'error', `Failed to get youtube-mp36 link after ${maxAttempts} attempts`);

    throw new Error('Failed to get youtube-mp36 link after 10 attempts');
}

async function addEpisodeLog(db, episodeSlug, type, message) {
    await db.collection('episodes').updateOne(
        { slug: episodeSlug },
        {
            $push: {
                logs: {
                    timestamp: new Date(),
                    type,
                    message
                }
            }
        }
    );
}
