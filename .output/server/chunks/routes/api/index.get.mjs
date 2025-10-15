import { d as defineEventHandler, c as connectDB, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
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
  const userId = ((_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId) || "anonymous";
  const db = await connectDB();
  let isDbConnected = false;
  try {
    await db.command({ ping: 1 });
    isDbConnected = true;
  } catch (e) {
    console.error(e);
  }
  let commitSha = "init unknown";
  try {
    commitSha = useRuntimeConfig().public.gitCommitSha;
  } catch (e) {
    console.error(e);
    commitSha = `Error getting commit sha ${e}`;
  }
  return {
    userId,
    commitSha,
    isDbConnected
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
