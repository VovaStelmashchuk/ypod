<template>
    <div class="main">
        <MeProfile />
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'auth',
    middleware: 'auth'
})
</script>
