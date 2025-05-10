import { Podcast } from 'podcast'

import { getBaseUrl } from '~/server/utils/config.js'
import { connectDB } from '~/server/db/mongo.js'
import { getFileSizeInByte, BUCKET } from '../utils/files'

const baseUrl = getBaseUrl()

const currentYear = new Date().getFullYear()

export async function updateRss(showSlug) {
    const db = await connectDB()
    const showInfo = await db.collection('shows').findOne({ slug: showSlug })

    const host = `https://${showInfo.mainDomain}`

    const logoUrl = `${baseUrl}/api/podcast/${showInfo.slug}/logo.jpg`
    const description = showInfo.about

    const author = showInfo.author

    const pubDate = new Date().toUTCString()

    const feed = new Podcast({
        title: showInfo.showName,
        description: description,
        feedUrl: showInfo.rssLink,
        siteUrl: host,
        webMaster: baseUrl,
        generator: 'YPod',
        imageUrl: logoUrl,
        author: author,
        copyright: `© 2020-${currentYear} ${showInfo.showName}`,
        language: 'uk',
        categories: ['Technology'],
        pubDate: pubDate,
        ttl: 60,
        itunesAuthor: author,
        itunesType: 'episodic',
        itunesSummary: description,
        itunesOwner: { name: author, email: 'vovochkastelmashchuk@gmail.com' },
        itunesExplicit: false,
        itunesCategory: [
            {
                text: 'Technology'
            },
            {
                text: 'News',
                subcats: [
                    {
                        text: 'Tech News'
                    }
                ]
            }
        ],
        itunesImage: logoUrl
    })

    const episodes = await db
        .collection('episodes')
        .find({ showSlug: showSlug })
        .sort({ position: 1 })
        .toArray()

    const fileSizes = await Promise.all(
        episodes.map((post) => getFileSizeInByte(BUCKET.audio, post.audio))
    )

    episodes.forEach((post, index) => {
        let episodeDescription = post.description

        let linkToEpisode = `${host}/episode/${post.slug}`

        let guid = post.youtubeVideoId

        let date = post.pubDate
        const duration = Math.round(post.duration)

        console.log('duration', duration, ' position ', post.position)

        feed.addItem({
            title: post.title,
            description: episodeDescription,
            url: linkToEpisode,
            guid: guid,
            date: date,
            enclosure: {
                url: `${baseUrl}/api/podcast/${showSlug}/${post.slug}/audio.mp3`,
                size: fileSizes[index]
            },
            itunesTitle: post.title,
            itunesDuration: duration,
            itunesExplicit: false,
            itunesEpisodeType: 'full',
            itunesSeason: 2,
            itunesEpisode: post.position,
            itunesImage: logoUrl,
            itunesAuthor: author,
            itunesSummary: episodeDescription
        })
    })

    const xml = feed.buildXml()

    await db
        .collection('shows')
        .updateOne({ slug: showSlug }, { $set: { rss: xml } })
}
