import { d as defineEventHandler, s as setResponseStatus, e as getRouterParam, c as connectDB, f as dropFile, B as BUCKET } from '../../../../nitro/nitro.mjs';
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

const index_delete = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const showSlug = getRouterParam(event, "show");
  const episodeSlug = getRouterParam(event, "episodeSlug");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ owners: userId, slug: showSlug });
  if (!show) {
    return;
  }
  const episode = await db.collection("episodes").findOne({ showSlug: show.slug, slug: episodeSlug });
  await dropFile(BUCKET.thumbnails, episode.image);
  await dropFile(BUCKET.audio, episode.audio);
  await db.collection("episodes").deleteOne({ _id: episode._id });
  return;
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
