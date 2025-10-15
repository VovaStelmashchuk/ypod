import { d as defineEventHandler, c as connectDB, e as getRouterParam } from '../../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'events';
import 'http';
import 'stream';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'mongodb';
import 'podcast';
import 'node:url';

const index_get = defineEventHandler(async (event) => {
  const db = await connectDB();
  let showSlug = getRouterParam(event, "slug");
  if (showSlug === "--auto-slug--") {
    const host = event.node.req.headers.host;
    const show2 = await db.collection("shows").findOne({ domains: host });
    showSlug = show2.slug;
  }
  const episodeSlug = getRouterParam(event, "episodeSlug");
  const episode = await db.collection("episodes").findOne({ showSlug, slug: episodeSlug });
  const show = await db.collection("shows").findOne({ slug: showSlug });
  return {
    showName: show.showName,
    links: show.links,
    slug: episode.slug,
    description: episode.shortDescription,
    title: episode.title,
    youtubeVideoId: episode.youtubeVideoId,
    audioUrl: `/api/podcast/${showSlug}/${episodeSlug}/audio.mp3`
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
