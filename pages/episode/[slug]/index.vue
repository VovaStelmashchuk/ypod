<template>
    <div>
        <NuxtLink to="/">
            <h1 class="p-5 text-center text-4xl font-bold text-gray-900">{{ data.showName }}</h1>
        </NuxtLink>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <MainButton v-for="link in data.links" :theme="buttonThemeType.primary" :label="link.text" :href="link.link"
                tag="a" target="_blank" class="w-full text-center" />
        </div>
        <h2 class="p-5 text-center text-3xl font-semibold text-gray-900">{{ data.title }}</h2>
        <div class="mt-5">
            <div class="relative pb-[56.25%] pt-6 h-0">
                <iframe :src="`https://www.youtube.com/embed/${data.youtubeVideoId}`" :title="`${data.title}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                    class="absolute top-0 left-0 w-full h-full"></iframe>
            </div>
        </div>
        <p class="mt-6 text-base text-gray-900">{{ data.description }}</p>
        <audio class="mt-6 w-full" controls :src="data.audioUrl"></audio>
    </div>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'
import { useFetch } from 'nuxt/app'

const route = useRoute()
const slug = route.params.slug

const { data } = await useFetch(`/api/podcast/--auto-slug--/${slug}`)
</script>
