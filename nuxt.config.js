export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: true
    },
    runtimeConfig: {
        public: {
            secretFile: '.secret.json',
            baseUrl: 'http://localhost:3000',
            gitCommitSha: ''
        }
    },
    css: ['@/assets/css/main.css'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "./assets/scss/variables.scss";
                        @import "./assets/scss/mixins.scss";
                        @import "./assets/scss/fonts.scss";
                        @import "./assets/scss/global.scss";
                    `
                }
            }
        },
        build: {
            minify: 'terser',
            chunkSizeWarningLimit: 1000
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: 'Ypod - Youtube playlist to podcast RSS',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'Podcast, youtube, Ypod'
                },
                {
                    hid: 'robots',
                    name: 'robots',
                    content: 'index, follow'
                },
                {
                    hid: 'author',
                    name: 'author',
                    content: 'Vova Stelmashchuk'
                }
            ],
            link: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/favicon/apple-touch-icon.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon/favicon-32x32.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon/favicon-16x16.png'
                },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon/favicon.ico'
                }
            ]
        }
    },
    nitro: {
        experimental: {
            websocket: true
        },
        compressPublicAssets: true
    },
    experimental: { appManifest: false },
    build: {
        extractCSS: true
    }
})
