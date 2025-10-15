import { d as defineEventHandler, m as checkMongoHealth, s as setResponseStatus } from '../../../nitro/nitro.mjs';
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

const health_get = defineEventHandler(async (event) => {
  try {
    const mongoHealthy = await checkMongoHealth();
    if (!mongoHealthy) {
      setResponseStatus(event, 503);
      return { status: "unhealthy" };
    }
    return { status: "healthy" };
  } catch (error) {
    setResponseStatus(event, 503);
    return { status: "unhealthy" };
  }
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
