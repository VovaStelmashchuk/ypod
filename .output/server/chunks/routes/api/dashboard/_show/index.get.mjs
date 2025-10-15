import { d as defineEventHandler, s as setResponseStatus, e as getRouterParam, c as connectDB } from '../../../../nitro/nitro.mjs';
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
    setResponseStatus(event, 401);
    return;
  }
  const showSlug = getRouterParam(event, "show");
  const episodeSlug = getRouterParam(event, "episodeSlug");
  const db = await connectDB();
  const show = await db.collection("shows").findOne({ owners: userId, slug: showSlug });
  if (!show) {
    setResponseStatus(event, 404);
    return { error: "Show not found" };
  }
  const episode = await db.collection("episodes").findOne({ showSlug: show.slug, slug: episodeSlug });
  if (!episode) {
    setResponseStatus(event, 404);
    return { error: "Episode not found" };
  }
  return {
    showName: show.showName,
    showSlug: show.slug,
    episode: {
      slug: episode.slug,
      title: episode.title,
      description: episode.description,
      shortDescription: episode.shortDescription,
      youtubeVideoId: episode.youtubeVideoId,
      image: `/api/podcast/${showSlug}/${episodeSlug}/thumbnail`,
      audioUrl: `/api/podcast/${showSlug}/${episodeSlug}/audio.mp3`,
      hasAudio: !!episode.audio,
      position: episode.position,
      createdAt: episode.createdAt,
      updatedAt: episode.updatedAt
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
