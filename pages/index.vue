<template>
    <MainLending v-if="data.type === 'lending'" />
    <PodcastPage v-else-if="data.type === 'podcast'" :slug="data.podcastSlug" />
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const { data } = await useFetch('/api/type', {
    method: 'GET'
})
</script>

<style lang="scss" scoped></style>
