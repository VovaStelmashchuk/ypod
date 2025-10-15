<template>
    <div class="podcast">
        <h1 class="podcast__title">{{ data.showName }}</h1>
    </div>

    <div class="podcast__logo-upload">
        <label for="logo-upload" class="podcast__logo-label">Upload Podcast Logo</label>
        <div class="podcast__logo-controls">
            <input id="logo-upload" type="file" accept="image/*" @change="handleLogoUpload" ref="logoInput"
                class="podcast__logo-input" />
            <div style="--loader-size: 16px" v-if="isLogoUploading">
                <MainLoader />
            </div>
        </div>
    </div>

    <div class="podcast__sync-block">
        <MainButton :theme="buttonThemeType.primary" label="Sync with youtube playlist" class="podcast__sync-button"
            @click="syncPlaylist" />
        <div style="--loader-size: 16px" v-if="isSyncInProgress">
            <MainLoader />
        </div>
        <MainButton :theme="buttonThemeType.primary" label="Update RSS" class="podcast__sync-button"
            @click="updateRSS" />
        <div style="--loader-size: 16px" v-if="isRssUpdateInProgress">
            <MainLoader />
        </div>
    </div>
    <div class="main__grid">
        <NuxtLink v-for="episode in data.episodes" :to="`/dashboard/${showSlug}/${episode.slug}`" class="episode-card">
            <img :src="episode.image" alt="Podcast logo" class="episode-card__image" />
            <p class="episode-card__title">{{ episode.title }}</p>
        </NuxtLink>
    </div>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'

definePageMeta({
    layout: 'auth'
})
const route = useRoute()
const showSlug = route.params.show
import { useFetch } from 'nuxt/app'

const { data } = await useFetch(`/api/dashboard/${showSlug}/episodes`)

const isSyncInProgress = ref(false)
const isLogoUploading = ref(false)
const isRssUpdateInProgress = ref(false)
const logoInput = ref(null)

const handleLogoUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    isLogoUploading.value = true

    const formData = new FormData()
    formData.append('logo', file)

    try {
        await $fetch(`/api/dashboard/${showSlug}/logo`, {
            method: 'POST',
            body: formData
        })
        // Optionally refresh the page or show success message
        window.location.reload()
    } catch (error) {
        console.error('Error uploading logo:', error)
        alert('Failed to upload logo. Please try again.')
    } finally {
        isLogoUploading.value = false
        if (logoInput.value) {
            logoInput.value.value = ''
        }
    }
}

const syncPlaylist = async () => {
    isSyncInProgress.value = true
    await useFetch(`/api/dashboard/${showSlug}/sync`, {
        method: 'POST'
    })
    isSyncInProgress.value = false
}

const updateRSS = async () => {
    isRssUpdateInProgress.value = true
    try {
        await $fetch(`/api/dashboard/${showSlug}/rss-update`, {
            method: 'POST'
        })
    } catch (error) {
        console.error('Error updating RSS:', error)
    } finally {
        isRssUpdateInProgress.value = false
    }
}
</script>

<style lang="scss" scoped>
.podcast {
    &__logo-upload {
        margin: 16px 0;
        padding: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    &__logo-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        color: #333;
    }

    &__logo-controls {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__logo-input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        font-size: 14px;

        &::-webkit-file-upload-button {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            margin-right: 8px;

            &:hover {
                background-color: #0056b3;
            }
        }
    }

    &__sync-block {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }

    &__sync-button {
        margin: 8px 0;
    }
}

.episode-card {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, opacity 0.2s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-4px);
        opacity: 0.9;
    }

    &__image {
        width: 100%;
        height: auto;
        margin: 0;
        border-radius: 1rem;
    }

    &__title {
        margin-top: 8px;
        font-weight: 500;
    }
}
</style>
