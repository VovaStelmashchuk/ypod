const client_manifest = {
  "_BfXJZl7K.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BfXJZl7K.js",
    "name": "Footer",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_CKF2TIbN.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CKF2TIbN.js",
    "name": "Avatar",
    "imports": [
      "_XyBVhfp_.js",
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_CcLVj9_o.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CcLVj9_o.js",
    "name": "MainButton",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_D4WPCdkm.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "D4WPCdkm.js",
    "name": "fetch",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_DfH7CL4k.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "DfH7CL4k.js",
    "name": "MainLoader",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_XyBVhfp_.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "XyBVhfp_.js",
    "name": "auth",
    "imports": [
      "_D4WPCdkm.js",
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "layouts/auth.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "SR-gUFdA.js",
    "name": "auth",
    "src": "layouts/auth.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CKF2TIbN.js",
      "_BfXJZl7K.js",
      "_XyBVhfp_.js",
      "_D4WPCdkm.js"
    ]
  },
  "layouts/default.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "D89O2V7z.js",
    "name": "default",
    "src": "layouts/default.vue",
    "isDynamicEntry": true,
    "imports": [
      "_BfXJZl7K.js",
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "layouts/doc.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "C4Cz3d2N.js",
    "name": "doc",
    "src": "layouts/doc.vue",
    "isDynamicEntry": true,
    "imports": [
      "_BfXJZl7K.js",
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "middleware/auth.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CEAXxc_H.js",
    "name": "auth",
    "src": "middleware/auth.js",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_XyBVhfp_.js",
      "_D4WPCdkm.js"
    ]
  },
  "node_modules/nuxt/dist/app/entry.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BWI5sAI2.js",
    "name": "entry",
    "src": "node_modules/nuxt/dist/app/entry.js",
    "isEntry": true,
    "dynamicImports": [
      "middleware/auth.js",
      "layouts/auth.vue",
      "layouts/default.vue",
      "layouts/doc.vue"
    ],
    "_globalCSS": true
  },
  "pages/auth/google/callback.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BtKK7aPx.js",
    "name": "callback",
    "src": "pages/auth/google/callback.vue",
    "isDynamicEntry": true,
    "imports": [
      "_DfH7CL4k.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_D4WPCdkm.js"
    ]
  },
  "pages/dashboard/[show]/[episodeSlug].vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BK2izneN.js",
    "name": "_episodeSlug_",
    "src": "pages/dashboard/[show]/[episodeSlug].vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CcLVj9_o.js",
      "_DfH7CL4k.js",
      "_D4WPCdkm.js"
    ]
  },
  "pages/dashboard/[show]/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "qLJsBW5Z.js",
    "name": "index",
    "src": "pages/dashboard/[show]/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_DfH7CL4k.js",
      "_CcLVj9_o.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_D4WPCdkm.js"
    ]
  },
  "pages/dashboard/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CfNgbel0.js",
    "name": "index",
    "src": "pages/dashboard/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_D4WPCdkm.js"
    ]
  },
  "pages/doc/terms-and-conditions.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "D_g9PJjX.js",
    "name": "terms-and-conditions",
    "src": "pages/doc/terms-and-conditions.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "pages/episode/[slug]/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "Bvyugtmi.js",
    "name": "index",
    "src": "pages/episode/[slug]/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CcLVj9_o.js",
      "_D4WPCdkm.js"
    ]
  },
  "pages/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "SOcHajzw.js",
    "name": "index",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CcLVj9_o.js",
      "_D4WPCdkm.js"
    ]
  },
  "pages/profile.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "B9WI9ESW.js",
    "name": "profile",
    "src": "pages/profile.vue",
    "isDynamicEntry": true,
    "imports": [
      "_CKF2TIbN.js",
      "_CcLVj9_o.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_XyBVhfp_.js",
      "_D4WPCdkm.js"
    ]
  }
};

export { client_manifest as default };
//# sourceMappingURL=client.manifest.mjs.map
