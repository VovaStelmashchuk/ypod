import { d as defineEventHandler, e as getRouterParam, c as connectDB, l as setResponseHeaders, s as setResponseStatus } from '../../../../nitro/nitro.mjs';
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

const rss_xml = defineEventHandler(async (event) => {
  const showSlug = getRouterParam(event, "slug");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ slug: showSlug });
  await db.collection("shows").updateOne({ slug: showSlug }, { $inc: { rssDownloadCount: 1 } });
  const rss = show == null ? void 0 : show.rss;
  setResponseHeaders(event, {
    "Content-Type": "application/rss+xml",
    "Cache-Control": "public, max-age=86400",
    // Cache for 1 day
    "Content-Length": String(Buffer.from(rss).length)
  });
  if (event.req.method === "HEAD") {
    setResponseStatus(event, 200);
    return "";
  }
  const readStream = new ReadableStream({
    start(controller) {
      controller.enqueue(Buffer.from(rss));
      controller.close();
    }
  });
  return readStream;
});

export { rss_xml as default };
//# sourceMappingURL=rss.xml.mjs.map
