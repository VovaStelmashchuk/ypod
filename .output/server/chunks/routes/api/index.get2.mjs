import { d as defineEventHandler, s as setResponseStatus, c as connectDB } from '../../nitro/nitro.mjs';
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
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const db = await connectDB();
  const user = await db.collection("users").findOne({ id: userId });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatarUrl || "/api/user/avatar"
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
