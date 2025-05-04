<template>
    <div class="main__grid">
        <NuxtLink :to="`/dashboard/${show.slug}`" v-for="show in data.shows"
            ><h2>{{ show.name }}</h2>
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

<style lang="scss" scoped></style>
