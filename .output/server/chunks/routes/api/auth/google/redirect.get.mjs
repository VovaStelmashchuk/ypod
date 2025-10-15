import { d as defineEventHandler, u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
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

const redirect_get = defineEventHandler(async (_) => {
  return {
    url: await buildGoogleAuthLink()
  };
});
async function buildGoogleAuthLink() {
  const baseUrl = useRuntimeConfig().public.baseUrl;
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.append("client_id", useRuntimeConfig().googleClientId);
  url.searchParams.append("redirect_uri", `${baseUrl}/auth/google/callback`);
  url.searchParams.append("response_type", "token");
  url.searchParams.append("scope", "email profile");
  return url.toString();
}

export { redirect_get as default };
//# sourceMappingURL=redirect.get.mjs.map
