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

const rssUpdate_post = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(event, 401);
    return { error: "Unauthorized" };
  }
  const showSlug = getRouterParam(event, "show");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ owners: userId, slug: showSlug });
  if (!show) {
    setResponseStatus(event, 404);
    return { error: "Show not found" };
  }
  await db.collection("shows").updateOne(
    { _id: show._id },
    {
      $set: {
        rssStatusSync: "pending",
        rssSyncError: null
      }
    }
  );
  return { success: true, message: "RSS sync status updated to pending" };
});

export { rssUpdate_post as default };
//# sourceMappingURL=rss-update.post.mjs.map
