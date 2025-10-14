<template>
    <div class="episode-details">
        <div class="episode-details__header">
            <NuxtLink :to="`/dashboard/${data.showSlug}`" class="episode-details__back">
                ← Back to {{ data.showName }}
            </NuxtLink>
            <h1 class="episode-details__title">{{ data.episode.title }}</h1>
        </div>

        <div class="episode-details__content">
            <div class="episode-details__section">
                <h2>Episode Information</h2>
                <div class="episode-details__info-grid">
                    <div class="episode-details__info-item">
                        <span class="label">Slug:</span>
                        <span class="value">{{ data.episode.slug }}</span>
                    </div>
                    <div class="episode-details__info-item">
                        <span class="label">Position:</span>
                        <span class="value">{{ data.episode.position }}</span>
                    </div>
                    <div class="episode-details__info-item">
                        <span class="label">Audio Status:</span>
                        <span class="value"
                            :class="{ 'status-success': data.episode.hasAudio, 'status-warning': !data.episode.hasAudio }">
                            {{ data.episode.hasAudio ? '✓ Uploaded' : '⚠ Not Uploaded' }}
                        </span>
                    </div>
                    <div class="episode-details__info-item" v-if="data.episode.createdAt">
                        <span class="label">Created:</span>
                        <span class="value">{{ new Date(data.episode.createdAt).toLocaleString() }}</span>
                    </div>
                </div>
            </div>

            <div class="episode-details__section">
                <h2>Thumbnail</h2>
                <img :src="data.episode.image" :alt="data.episode.title" class="episode-details__thumbnail" />
            </div>

            <div class="episode-details__section" v-if="data.episode.youtubeVideoId">
                <h2>YouTube Video</h2>
                <div class="videoWrapper">
                    <iframe :src="`https://www.youtube.com/embed/${data.episode.youtubeVideoId}`"
                        :title="data.episode.title" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>

            <div class="episode-details__section">
                <h2>Short Description</h2>
                <p class="episode-details__description">
                    {{ data.episode.shortDescription || 'No short description available' }}
                </p>
            </div>

            <div class="episode-details__section">
                <h2>Full Description</h2>
                <p class="episode-details__description">
                    {{ data.episode.description || 'No description available' }}
                </p>
            </div>

            <div class="episode-details__section" v-if="data.episode.hasAudio">
                <h2>Audio Player</h2>
                <audio controls :src="data.episode.audioUrl" class="episode-details__audio"></audio>
            </div>

            <div class="episode-details__section">
                <h2>Upload Audio</h2>
                <div class="episode-details__upload">
                    <input type="file" accept="audio/mp3,audio/mpeg" @change="handleFileSelect" ref="fileInput"
                        class="episode-details__file-input" />
                    <MainButton :theme="buttonThemeType.primary" :label="isUploading ? 'Uploading...' : 'Upload Audio'"
                        @click="uploadAudio" :disabled="!selectedFile || isUploading"
                        class="episode-details__upload-button" />
                    <div v-if="isUploading" style="--loader-size: 16px">
                        <MainLoader />
                    </div>
                    <p v-if="uploadMessage"
                        :class="{ 'message-success': uploadSuccess, 'message-error': !uploadSuccess }">
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

const handleFileSelect = (event) => {
    selectedFile.value = event.target.files[0]
    uploadMessage.value = ''
}

const uploadAudio = async () => {
    if (!selectedFile.value) return

    isUploading.value = true
    uploadMessage.value = ''

    try {
        const formData = new FormData()
        formData.append('audio', selectedFile.value)

        const response = await $fetch(`/api/dashboard/${showSlug}/${episodeSlug}/upload`, {
            method: 'POST',
            body: formData
        })

        uploadMessage.value = 'Audio uploaded successfully!'
        uploadSuccess.value = true

        // Refresh the page data
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    } catch (error) {
        uploadMessage.value = 'Failed to upload audio. Please try again.'
        uploadSuccess.value = false
    } finally {
        isUploading.value = false
    }
}
</script>

<style lang="scss" scoped>
.episode-details {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    &__header {
        margin-bottom: 32px;
    }

    &__back {
        display: inline-block;
        margin-bottom: 16px;
        color: #007bff;
        text-decoration: none;
        font-size: 14px;

        &:hover {
            text-decoration: underline;
        }
    }

    &__title {
        font-size: 32px;
        font-weight: bold;
        margin: 0;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    &__section {
        background: rgba(255, 255, 255, 0.05);
        padding: 24px;
        border-radius: 12px;

        h2 {
            margin-top: 0;
            margin-bottom: 16px;
            font-size: 20px;
            font-weight: 600;
        }
    }

    &__info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
    }

    &__info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .label {
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.7;
            font-weight: 600;
        }

        .value {
            font-size: 16px;
        }

        .status-success {
            color: #28a745;
        }

        .status-warning {
            color: #ffc107;
        }
    }

    &__thumbnail {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 8px;
    }

    &__description {
        line-height: 1.6;
        white-space: pre-wrap;
    }

    &__audio {
        width: 100%;
        max-width: 600px;
    }

    &__upload {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
    }

    &__file-input {
        padding: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.05);
        color: inherit;
    }

    &__upload-button {
        min-width: 150px;
    }
}

.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    padding-top: 25px;
    height: 0;
    max-width: 800px;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.message-success {
    color: #28a745;
}

.message-error {
    color: #dc3545;
}
</style>
