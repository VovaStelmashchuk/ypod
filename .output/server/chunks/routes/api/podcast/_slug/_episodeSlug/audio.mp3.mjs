import { d as defineEventHandler, e as getRouterParam, c as connectDB, j as createError, k as getFileSizeInByte, l as setResponseHeaders, s as setResponseStatus, o as openDownloadStream, B as BUCKET } from '../../../../../nitro/nitro.mjs';
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

const audio_mp3 = defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const showSlug = getRouterParam(event, "slug");
  const episodeSlug = getRouterParam(event, "episodeSlug");
  const db = await connectDB();
  const episode = await db.collection("episodes").findOne({ showSlug, slug: episodeSlug });
  const audio = episode == null ? void 0 : episode.audio;
  if (!audio) {
    throw createError({
      statusCode: 404,
      statusMessage: "Audio not found"
    });
  }
  const fileLength = await getFileSizeInByte(BUCKET.audio, audio);
  const range = event.node.req.headers.range;
  let start = 0;
  let end = fileLength - 1;
  console.log("Audio file length:", fileLength);
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    start = parseInt(parts[0], 10);
    end = parts[1] ? parseInt(parts[1], 10) : end;
    if (start >= fileLength || end >= fileLength) {
      event.node.res.writeHead(416, {
        "Content-Range": `bytes */${fileLength}`
      });
      return "";
    }
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileLength}`,
      "Content-Length": String(end - start + 1),
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
      "Accept-Ranges": "bytes"
    };
    if (method === "HEAD") {
      setResponseHeaders(event, headers);
      setResponseStatus(event, 206);
      return "";
    }
    event.node.res.writeHead(206, headers);
  } else {
    const headers = {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
      "Accept-Ranges": "bytes",
      "Content-Length": String(fileLength)
    };
    if (method === "HEAD") {
      setResponseHeaders(event, headers);
      setResponseStatus(event, 200);
      return "";
    }
    setResponseHeaders(event, headers);
  }
  const readStream = await openDownloadStream(BUCKET.audio, audio, {
    start,
    end: end + 1
  });
  return readStream;
});

export { audio_mp3 as default };
//# sourceMappingURL=audio.mp3.mjs.map
