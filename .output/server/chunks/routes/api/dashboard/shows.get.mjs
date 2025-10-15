import { d as defineEventHandler, s as setResponseStatus, c as connectDB } from '../../../nitro/nitro.mjs';
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

const shows_get = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const db = await connectDB();
  const shows = await db.collection("shows").find({ owners: userId }).toArray();
  const resultShows = shows.map((show) => {
    return {
      slug: show.slug,
      name: show.showName
    };
  });
  return {
    shows: resultShows
  };
});

export { shows_get as default };
//# sourceMappingURL=shows.get.mjs.map
