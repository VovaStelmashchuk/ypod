<template>
    <div>
        <h1 class="p-5 text-center text-4xl font-bold text-gray-900">{{ data.showName }}</h1>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <MainButton v-for="link in data.links" :theme="buttonThemeType.primary" :label="link.text" :href="link.link"
                tag="a" target="_blank" class="w-full text-center" />
        </div>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-5">
            <div v-for="episode in data.episodes" class="bg-gray-200 rounded-2xl">
                <NuxtLink :to="`/episode/${episode.slug}`">
                    <img :src="episode.image" alt="Podcast logo" class="w-full h-auto m-0 rounded-2xl" />
                    <h5 class="p-5 text-left text-xl font-bold text-gray-900">{{ episode.title }}</h5>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'
const { slug } = defineProps({
    slug: {
        type: String,
        default: ''
    }
})

const { data } = await useFetch(`/api/podcast/${slug}`)
</script>
