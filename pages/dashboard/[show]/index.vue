<template>
    <div>
        <h1 class="p-5 text-center text-4xl font-bold text-gray-900">{{ data.showName }}</h1>
    </div>

    <div class="my-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <label for="logo-upload" class="block mb-2 font-semibold text-sm text-gray-900">Upload Podcast Logo</label>
        <div class="flex items-center gap-3">
            <input id="logo-upload" type="file" accept="image/*" @change="handleLogoUpload" ref="logoInput"
                class="p-2 border border-gray-300 rounded bg-white cursor-pointer text-sm text-gray-900 file:py-1.5 file:px-3 file:border-0 file:rounded file:bg-blue-500 file:text-white file:cursor-pointer file:mr-2 hover:file:bg-blue-600" />
            <div v-if="isLogoUploading" class="w-4 h-4">
                <MainLoader />
            </div>
        </div>
    </div>

    <div class="flex flex-row items-center gap-2">
        <MainButton :theme="buttonThemeType.primary" label="Sync with youtube playlist" class="my-2"
            @click="syncPlaylist" />
        <div v-if="isSyncInProgress" class="w-4 h-4">
            <MainLoader />
        </div>
        <MainButton :theme="buttonThemeType.primary" label="Update RSS" class="my-2" @click="updateRSS" />
        <div v-if="isRssUpdateInProgress" class="w-4 h-4">
            <MainLoader />
        </div>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        <NuxtLink v-for="episode in data.episodes" :to="`/dashboard/${showSlug}/${episode.slug}`"
            class="block no-underline text-inherit transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-1 hover:opacity-90">
            <img :src="episode.image" alt="Podcast logo" class="w-full h-auto m-0 rounded-2xl" />
            <p class="mt-2 font-medium text-gray-900">{{ episode.title }}</p>
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
