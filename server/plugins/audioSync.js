import { connectDB } from '../db/mongo'
import { getRapidApiKey, getRapidApiMd5 } from '../utils/config'
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
    const audioFileName = `${episode.slug}.mp3`
    try {
        await downoaldAudioFromYoutube(episode.youtubeVideoId, episode.slug, db, audioFileName)

        await db.collection('episodes').updateOne(
            { slug: episode.slug },
            {
                $set: {
                    audioSyncStatus: 'done',
                    audioSyncError: null,
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

async function downoaldAudioFromYoutube(youtubeVideoId, episodeSlug, db, audioFileName) {
    const downloaders = [
        {
            name: 'youtube-to-mp335',
            fn: () => getYoutubeLinkByYoutubeToMp3(youtubeVideoId, episodeSlug, db, audioFileName)
        },
        {
            name: 'youtube-mp36',
            fn: () => getYoutubeLinkByYoutubeMp36(youtubeVideoId, episodeSlug, db, audioFileName)
        },
        {
            name: 'youtube-to-mp315',
            fn: () => getYoutubeLinkByYoutubeMp315(youtubeVideoId, episodeSlug, db, audioFileName)
        },
        {
            name: 'youtube-mp4-mp3-downloader',
            fn: () => getYoutubeLinkByYoutubeMp4Mp3Downloader(youtubeVideoId, episodeSlug, db, audioFileName)
        }
    ]

    for (const downloader of downloaders) {
        try {
            await addEpisodeLog(db, episodeSlug, 'info', `Trying to get audio using ${downloader.name}`)
            return await downloader.fn()
        } catch (error) {
            await addEpisodeLog(db, episodeSlug, 'error', `Failed to get youtube download link by ${downloader.name}`)
            console.log(`Failed to get youtube download link by ${downloader.name}`, error)
        }
    }

    throw new Error('All download methods failed')
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

    await downloadFile(
        BUCKET.audio,
        audioFileName,
        youtubeToMp3Response.url,
    )
}

//youtube-mp36
async function getYoutubeLinkByYoutubeMp36(youtubeVideoId, episodeSlug, db, audioFileName) {
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
                const xRunHeader = getRapidApiMd5();

                await downloadFile(
                    BUCKET.audio,
                    audioFileName,
                    response.link,
                    { 'X-RUN': xRunHeader }
                )
                return
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

// youtube-to-mp315
async function getYoutubeLinkByYoutubeMp315(youtubeVideoId, episodeSlug, db, audioFileName) {
    await addEpisodeLog(db, episodeSlug, 'info', `Getting youtube link by youtube-to-mp315`);
    const url = `https://youtube-to-mp315.p.rapidapi.com/download?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtubeVideoId}`)}&format=mp3`;
    const headers = {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'youtube-to-mp315.p.rapidapi.com',
        'Content-Type': 'application/json'
    };

    const maxAttempts = 10;
    let attempt = 0;

    while (attempt < maxAttempts) {
        attempt++;
        await addEpisodeLog(db, episodeSlug, 'info', `youtube-to-mp315: Attempt ${attempt} - Checking conversion status`);

        try {
            const response = await $fetch(url, {
                method: 'POST',
                headers,
                body: {}
            });

            let data = response;
            if (typeof response === 'string') {
                try {
                    data = JSON.parse(response);
                } catch (e) {
                    await addEpisodeLog(db, episodeSlug, 'error', `youtube-to-mp315: Failed to parse response: ${response}`);
                    throw new Error('youtube-to-mp315: Invalid response format');
                }
            }

            await addEpisodeLog(db, episodeSlug, 'info', `youtube-to-mp315: Response: ${JSON.stringify(data)}`);

            if (data.status === 'AVAILABLE' && data.downloadUrl) {
                await downloadFile(
                    BUCKET.audio,
                    audioFileName,
                    data.downloadUrl
                );
                return;
            } else if (data.status === 'EXPIRED' || data.status === 'CONVERSION_ERROR') {
                throw new Error(`youtube-to-mp315: Conversion failed with status ${data.status}`);
            }

            // Wait for 1 minute before retrying
            await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
        } catch (error) {
            await addEpisodeLog(db, episodeSlug, 'error', `youtube-to-mp315: Error occurred: ${error.message}`);
            await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
        }
    }

    await addEpisodeLog(db, episodeSlug, 'error', `youtube-to-mp315: Failed to get AVAILABLE status after ${maxAttempts} attempts`);
    throw new Error('youtube-to-mp315: Failed to get AVAILABLE status after 10 attempts');
}

async function getYoutubeLinkByYoutubeMp4Mp3Downloader(youtubeVideoId, episodeSlug, db, audioFileName) {
    await addEpisodeLog(db, episodeSlug, 'info', `Getting youtube link by youtube-mp4-mp3-downloader`);

    const url = `https://youtube-mp4-mp3-downloader.p.rapidapi.com/api/v1/download?format=mp3&id=${youtubeVideoId}&audioQuality=320&addInfo=false`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': getRapidApiKey(),
            'x-rapidapi-host': 'youtube-mp4-mp3-downloader.p.rapidapi.com'
        }
    };


    try {
        const response = await $fetch(url, options);
        const progressId = response.progressId;
        const maxAttempts = 10;
        const waitTimeMs = 60 * 1000; // 1 minute

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            await addEpisodeLog(db, episodeSlug, 'info', `youtube-mp4-mp3-downloader: Checking progress attempt ${attempt}/${maxAttempts}`);

            try {
                const progressUrl = `https://youtube-mp4-mp3-downloader.p.rapidapi.com/api/v1/progress?id=${progressId}`;
                const progressResponse = await $fetch(progressUrl, options);

                await addEpisodeLog(db, episodeSlug, 'info', `youtube-mp4-mp3-downloader: Progress response: ${JSON.stringify(progressResponse)}`);

                if (progressResponse.finished && progressResponse.downloadUrl) {
                    await downloadFile(
                        BUCKET.audio,
                        audioFileName,
                        progressResponse.downloadUrl
                    );
                    return;
                }

                if (attempt < maxAttempts) {
                    await addEpisodeLog(db, episodeSlug, 'info', `youtube-mp4-mp3-downloader: Waiting ${waitTimeMs / 1000} seconds before next attempt`);
                    await new Promise((resolve) => setTimeout(resolve, waitTimeMs));
                }
            } catch (error) {
                await addEpisodeLog(db, episodeSlug, 'error', `youtube-mp4-mp3-downloader: Progress check error: ${error.message}`);
                if (attempt < maxAttempts) {
                    await new Promise((resolve) => setTimeout(resolve, waitTimeMs));
                }
            }
        }

        await addEpisodeLog(db, episodeSlug, 'error', `youtube-mp4-mp3-downloader: Failed to get download URL after ${maxAttempts} attempts`);

        throw new Error(`youtube-mp4-mp3-downloader: Failed with status ${data.status}`);
    } catch (error) {
        await addEpisodeLog(db, episodeSlug, 'error', `youtube-mp4-mp3-downloader: Error occurred: ${error.message}`);
        throw error;
    }
}

async function addEpisodeLog(db, episodeSlug, type, message) {
    await db.collection('episodes').updateOne(
        { slug: episodeSlug },
        {
            $push: {
                logs: {
                    $each: [{
                        timestamp: new Date(),
                        type,
                        message
                    }],
                    $slice: -50 // Keep only the last 50 items
                }
            }
        }
    );
}
