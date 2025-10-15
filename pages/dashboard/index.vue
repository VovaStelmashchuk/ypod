<template>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        <NuxtLink :to="`/dashboard/${show.slug}`" v-for="show in data.shows">
            <h2 class="text-3xl font-semibold text-gray-900">{{ show.name }}</h2>
        </NuxtLink>
    </div>
</template>
<script setup>
import { useFetch } from 'nuxt/app'
definePageMeta({
    layout: 'auth'
})
const { data: data } = await useFetch('/api/dashboard/shows')
</script>
