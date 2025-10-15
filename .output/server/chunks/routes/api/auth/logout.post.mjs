import { d as defineEventHandler, p as parseCookies, b as removeSessionFromUser, a as setCookie } from '../../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  const cookie = parseCookies(event);
  const sessionId = cookie.sessionId;
  removeSessionFromUser(sessionId);
  setCookie(event, "sessionId", "", {
    expires: /* @__PURE__ */ new Date(0)
  });
  return {};
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
