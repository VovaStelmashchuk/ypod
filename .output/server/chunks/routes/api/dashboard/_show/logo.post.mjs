import { d as defineEventHandler, s as setResponseStatus, e as getRouterParam, c as connectDB, h as readMultipartFormData, j as createError, i as uploadFile, B as BUCKET } from '../../../../nitro/nitro.mjs';
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

const logo_post = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.userId;
  if (!userId) {
    setResponseStatus(401);
    return;
  }
  const showSlug = getRouterParam(event, "show");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ owners: userId, slug: showSlug });
  if (!show) {
    return;
  }
  const fields = await readMultipartFormData(event);
  const logoFiles = fields.filter((field) => field.name === "logo");
  if (logoFiles.length !== 1) {
    throw createError({
      statusCode: 400,
      message: "File logo is required"
    });
  }
  const logoFile = logoFiles[0];
  const fileBuffer = logoFile.data;
  const logoFileName = `${show.slug}.jpg`;
  await uploadFile(BUCKET.showLogo, logoFileName, fileBuffer);
  await db.collection("shows").updateOne(
    { _id: show._id },
    {
      $set: {
        logo: logoFileName
      }
    }
  );
});

export { logo_post as default };
//# sourceMappingURL=logo.post.mjs.map
