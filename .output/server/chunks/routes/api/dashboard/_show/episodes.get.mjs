import { d as defineEventHandler, s as setResponseStatus, e as getRouterParam, c as connectDB } from '../../../../nitro/nitro.mjs';
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

const episodes_get = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const showSlug = getRouterParam(event, "show");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ owners: userId, slug: showSlug });
  if (!show) {
    return;
  }
  const episodes = await db.collection("episodes").find({ showSlug: show.slug }).sort({ position: 1 }).toArray();
  return {
    showName: show.showName,
    episodes: episodes.map((episode) => ({
      title: episode.title,
      slug: episode.slug,
      image: `/api/podcast/${showSlug}/${episode.slug}/thumbnail`
    }))
  };
});

export { episodes_get as default };
//# sourceMappingURL=episodes.get.mjs.map
