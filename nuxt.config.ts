export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: true
    },
    modules: ['@nuxtjs/tailwindcss'],
    tailwindcss: {
        cssPath: '@/assets/css/tailwind.css',
        configPath: 'tailwind.config.ts',
    },
    runtimeConfig: {
        mongoUri: '',
        googleClientId: '',
        youtubeApiKey: '',
        public: {
            baseUrl: 'http://localhost:3000',
            gitCommitSha: ''
        }
    },
    vite: {
        build: {
            minify: 'terser',
            chunkSizeWarningLimit: 1000
        },
        server: {
            allowedHosts: ['ypod', 'testpodcast']
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
                    key: 'keywords',
                    name: 'keywords',
                    content: 'Podcast, youtube, Ypod'
                },
                {
                    key: 'robots',
                    name: 'robots',
                    content: 'index, follow'
                },
                {
                    key: 'author',
                    name: 'author',
                    content: 'Vova Stelmashchuk'
                }
            ]
        }
    },
    nitro: {
        experimental: {
            websocket: true
        },
        compressPublicAssets: true,
        bodySizeLimit: 100 * 1024 * 1024
    } as any,
    experimental: { appManifest: false }
})

