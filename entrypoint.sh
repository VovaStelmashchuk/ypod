#!/bin/sh

if [ -f /run/secrets/mongo_uri ]; then
  export NUXT_MONGO_URI="$(cat /run/secrets/mongo_uri)"
fi

if [ -f /run/secrets/google_client_id ]; then
  export NUXT_GOOGLE_CLIENT_ID="$(cat /run/secrets/google_client_id)"
fi

if [ -f /run/secrets/youtube_api_key ]; then
  export NUXT_YOUTUBE_API_KEY="$(cat /run/secrets/youtube_api_key)"
fi

exec node .output/server/index.mjs 