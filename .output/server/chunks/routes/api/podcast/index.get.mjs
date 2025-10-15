import { d as defineEventHandler, e as getRouterParam, c as connectDB } from '../../../nitro/nitro.mjs';
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
  const slug = getRouterParam(event, "slug");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ slug });
  const episodes = await db.collection("episodes").find({ showSlug: slug }).sort({ position: 1 }).toArray();
  const uiModel = episodes.map((episode) => ({
    slug: episode.slug,
    title: episode.title,
    description: episode.description,
    image: `/api/podcast/${slug}/${episode.slug}/thumbnail`
  }));
  return {
    showName: show.showName,
    links: show.links,
    episodes: uiModel
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
