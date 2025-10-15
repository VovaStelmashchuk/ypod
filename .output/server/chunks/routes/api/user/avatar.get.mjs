import { d as defineEventHandler, s as setResponseStatus, c as connectDB, n as getAvatarBucket, l as setResponseHeaders } from '../../../nitro/nitro.mjs';
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

const avatar_get = defineEventHandler(async (event) => {
  var _a, _b;
  const method = event.node.req.method;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const db = await connectDB();
  const avatarBucket = await getAvatarBucket();
  const user = await db.collection("users").findOne({ id: userId }, { projection: { avatarFileName: 1 } });
  const avatar = user == null ? void 0 : user.avatarFileName;
  if (!avatar) {
    setResponseStatus(404);
    return;
  }
  const files = await avatarBucket.find({ filename: avatar }).toArray();
  const fileLength = files.length > 0 ? files[0].length : 0;
  setResponseHeaders(event, {
    "Content-Type": "image/jpeg",
    "Cache-Control": "public, max-age=86400",
    // Cache for 1 day
    "Content-Length": String(fileLength)
  });
  if (method === "HEAD") {
    event.node.res.statusCode = 200;
    event.node.res.end();
    return;
  }
  const readStream = avatarBucket.openDownloadStreamByName(avatar);
  return readStream;
});

export { avatar_get as default };
//# sourceMappingURL=avatar.get.mjs.map
