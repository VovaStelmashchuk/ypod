import { d as defineEventHandler, e as getRouterParam, c as connectDB, j as createError, k as getFileSizeInByte, l as setResponseHeaders, o as openDownloadStream, B as BUCKET } from '../../../../../nitro/nitro.mjs';
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

const thumbnail_get = defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const showSlug = getRouterParam(event, "slug");
  const episodeSlug = getRouterParam(event, "episodeSlug");
  const db = await connectDB();
  const episode = await db.collection("episodes").findOne({ showSlug, slug: episodeSlug });
  const thumbnail = episode == null ? void 0 : episode.image;
  if (!thumbnail) {
    throw createError({
      statusCode: 404,
      statusMessage: "Thumbnail not found"
    });
  }
  const fileLength = await getFileSizeInByte(BUCKET.thumbnails, thumbnail);
  setResponseHeaders(event, {
    "Content-Type": "image/jpg",
    "Cache-Control": "public, max-age=86400",
    // Cache for 1 day
    "Content-Length": String(fileLength)
  });
  if (method === "HEAD") {
    event.node.res.statusCode = 200;
    event.node.res.end();
    return;
  }
  const readStream = await openDownloadStream(BUCKET.thumbnails, thumbnail);
  return readStream;
});

export { thumbnail_get as default };
//# sourceMappingURL=thumbnail.get.mjs.map
