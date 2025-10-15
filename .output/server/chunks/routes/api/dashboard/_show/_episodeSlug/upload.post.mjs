import { d as defineEventHandler, s as setResponseStatus, e as getRouterParam, c as connectDB, h as readMultipartFormData, i as uploadFile, B as BUCKET } from '../../../../../nitro/nitro.mjs';
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

const upload_post = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const showSlug = getRouterParam(event, "show");
  const episodeSlug = getRouterParam(event, "episodeSlug");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ owners: userId, slug: showSlug });
  if (!show) {
    return;
  }
  const episode = await db.collection("episodes").findOne({ showSlug: show.slug, slug: episodeSlug });
  const fields = await readMultipartFormData(event);
  const audioFiles = fields.filter((field) => field.name === "audio");
  const audioFile = audioFiles[0];
  const fileBuffer = audioFile.data;
  const audioFileName = `${episode.slug}.mp3`;
  await uploadFile(BUCKET.audio, audioFileName, fileBuffer);
  await db.collection("episodes").updateOne(
    { showSlug: show.slug, slug: episodeSlug },
    {
      $set: {
        audio: audioFileName
      }
    }
  );
  return {
    status: 200,
    message: "File uploaded successfully",
    fileName: audioFileName
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
