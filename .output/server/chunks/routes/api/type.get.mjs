import { d as defineEventHandler, c as connectDB } from '../../nitro/nitro.mjs';
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

const type_get = defineEventHandler(async (event) => {
  const host = event.node.req.headers.host;
  let type = null;
  let podcastSlug = null;
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ domains: host });
  if (show) {
    type = "podcast";
    podcastSlug = show == null ? void 0 : show.slug;
  } else {
    type = "lending";
    podcastSlug = null;
  }
  return {
    type,
    podcastSlug
  };
});

export { type_get as default };
//# sourceMappingURL=type.get.mjs.map
