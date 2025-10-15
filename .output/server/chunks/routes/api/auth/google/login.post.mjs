import { d as defineEventHandler, r as readBody, s as setResponseStatus, g as generateSession, c as connectDB, a as setCookie } from '../../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const { googleAccessToken } = await readBody(event);
  const url = new URL("https://www.googleapis.com/oauth2/v3/userinfo");
  url.searchParams.append("access_token", googleAccessToken);
  const data = await $fetch(url);
  const { sub, picture, email, name } = data;
  if (!sub || !email || !picture) {
    setResponseStatus(event, 401);
    return {
      error: "Invalid access token",
      isSub: !!sub,
      isEmail: !!email,
      isAvatar: !!picture
    };
  }
  const session = generateSession();
  const db = await connectDB();
  await db.collection("users").updateOne(
    { id: `google:${sub}` },
    {
      $set: {
        email,
        name,
        avatarUrl: picture,
        avatarSource: "origin",
        provider: "google",
        google: {
          sub
        }
      },
      $setOnInsert: {
        createdAt: /* @__PURE__ */ new Date()
      },
      $push: {
        sessions: session
      }
    },
    { upsert: true }
  );
  setCookie(event, "sessionId", session.sessionId, {
    expires: new Date(session.expiresAt)
  });
  return {
    ok: true
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
