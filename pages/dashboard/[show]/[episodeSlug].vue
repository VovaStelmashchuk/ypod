<template>
    <div class="max-w-6xl mx-auto p-5">
        <div class="mb-8">
            <NuxtLink :to="`/dashboard/${data.showSlug}`"
                class="inline-block mb-4 text-blue-500 no-underline text-sm hover:underline">
                ← Back to {{ data.showName }}
            </NuxtLink>
            <h1 class="text-4xl font-bold m-0 text-gray-900">{{ data.episode.title }}</h1>
        </div>

        <div class="flex flex-col gap-8">
            <div class="bg-gray-100/50 p-6 rounded-xl">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Episode Information</h2>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Slug:</span>
                        <span class="text-base text-gray-900">{{ data.episode.slug }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Position:</span>
                        <span class="text-base text-gray-900">{{ data.episode.position }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Audio Status:</span>
                        <span class="text-base"
                            :class="{ 'text-green-500': data.episode.hasAudio, 'text-yellow-500': !data.episode.hasAudio }">
                            {{ data.episode.hasAudio ? '✓ Uploaded' : '⚠ Not Uploaded' }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-1" v-if="data.episode.createdAt">
                        <span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Created:</span>
                        <span class="text-base text-gray-900">{{ new Date(data.episode.createdAt).toLocaleString()
                            }}</span>
                    </div>
                </div>
            </div>

            <div class="bg-gray-100/50 p-6 rounded-xl">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Thumbnail</h2>
                <img :src="data.episode.image" :alt="data.episode.title" class="w-full max-w-md h-auto rounded-lg" />
            </div>

            <div class="bg-gray-100/50 p-6 rounded-xl" v-if="data.episode.youtubeVideoId">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">YouTube Video</h2>
                <div class="relative pb-[56.25%] pt-6 h-0 max-w-4xl">
                    <iframe :src="`https://www.youtube.com/embed/${data.episode.youtubeVideoId}`"
                        :title="data.episode.title" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        class="absolute top-0 left-0 w-full h-full"></iframe>
                </div>
            </div>

            <div class="bg-gray-100/50 p-6 rounded-xl">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Short Description</h2>
                <p class="leading-relaxed whitespace-pre-wrap text-gray-900">
                    {{ data.episode.shortDescription || 'No short description available' }}
                </p>
            </div>

            <div class="bg-gray-100/50 p-6 rounded-xl">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Full Description</h2>
                <p class="leading-relaxed whitespace-pre-wrap text-gray-900">
                    {{ data.episode.description || 'No description available' }}
                </p>
            </div>

            <div class="bg-gray-100/50 p-6 rounded-xl" v-if="data.episode.hasAudio">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Audio Player</h2>
                <audio controls :src="data.episode.audioUrl" class="w-full max-w-2xl"></audio>
            </div>

            <div class="bg-gray-100/50 p-6 rounded-xl">
                <h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Upload Audio</h2>
                <div class="flex flex-col gap-3 items-start w-full max-w-2xl">
                    <input type="file" accept="audio/mp3,audio/mpeg" @change="handleFileSelect" ref="fileInput"
                        class="p-2 border border-gray-300 rounded bg-gray-50 text-gray-900" />
                    <MainButton :theme="buttonThemeType.primary" :label="isUploading ? 'Uploading...' : 'Upload Audio'"
                        @click="uploadAudio" :disabled="!selectedFile || isUploading" class="min-w-[150px]" />
                    <HorizontalProgressBar v-if="isUploading" :progress="uploadProgress" label="Uploading audio file..."
                        class="w-full" />
                    <p v-if="uploadMessage"
                        :class="{ 'text-green-500': uploadSuccess, 'text-red-500': !uploadSuccess }">
                        {{ uploadMessage }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'
import { useFetch } from 'nuxt/app'
import { onMounted } from 'vue'

definePageMeta({
    layout: 'auth'
})

const route = useRoute()
const showSlug = route.params.show
const episodeSlug = route.params.episodeSlug

onMounted(async () => {
    console.log('Episode details page mounted')
    console.log('Show:', showSlug)
    console.log('Episode:', episodeSlug)
})

const { data } = await useFetch(`/api/dashboard/${showSlug}/${episodeSlug}`)

const selectedFile = ref(null)
const fileInput = ref(null)
const isUploading = ref(false)
const uploadMessage = ref('')
const uploadSuccess = ref(false)
const uploadProgress = ref(0)

const handleFileSelect = (event) => {
    selectedFile.value = event.target.files[0]
    uploadMessage.value = ''
    uploadProgress.value = 0
}

const uploadAudio = async () => {
    if (!selectedFile.value) return

    isUploading.value = true
    uploadMessage.value = ''
    uploadProgress.value = 0

    try {
        const config = useRuntimeConfig()
        const chunkSize = config.public.uploadChunkSize
        const file = selectedFile.value
        const totalChunks = Math.ceil(file.size / chunkSize)
        const uploadId = `${Date.now()}-${Math.random().toString(36).substring(7)}`

        console.log(`Starting chunked upload: ${file.name}, size: ${file.size}, chunks: ${totalChunks}`)

        // Upload chunks sequentially
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize
            const end = Math.min(start + chunkSize, file.size)
            const chunk = file.slice(start, end)

            const formData = new FormData()
            formData.append('uploadId', uploadId)
            formData.append('chunkIndex', chunkIndex.toString())
            formData.append('totalChunks', totalChunks.toString())
            formData.append('originalFilename', file.name)
            formData.append('fileChunk', chunk)

            console.log(`Uploading chunk ${chunkIndex + 1}/${totalChunks}`)

            const response = await $fetch(`/api/dashboard/${showSlug}/${episodeSlug}/upload-chunk`, {
                method: 'POST',
                body: formData
            })

            // Update progress
            uploadProgress.value = ((chunkIndex + 1) / totalChunks) * 100

            console.log(`Chunk ${chunkIndex + 1}/${totalChunks} uploaded, status: ${response.status}`)

            if (response.status === 'complete') {
                uploadMessage.value = 'Audio uploaded successfully!'
                uploadSuccess.value = true

                // Refresh the page data
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        }
    } catch (error) {
        console.error('Upload error:', error)
        uploadMessage.value = 'Failed to upload audio. Please try again.'
        uploadSuccess.value = false
        uploadProgress.value = 0
    } finally {
        isUploading.value = false
    }
}
</script>
