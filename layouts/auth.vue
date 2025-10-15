<template>
    <div class="bg-gray-50 flex-col flex min-h-screen">
        <header class="mx-auto max-w-7xl w-full flex justify-between py-4 px-4">
            <NuxtLink to="/" class="no-underline">
                <h1 class="text-4xl font-black text-gray-900">YPod</h1>
            </NuxtLink>
            <Avatar :size="avatarSizeType.s" />
        </header>

        <main class="flex-grow my-10 mx-auto max-w-7xl w-full px-4">
            <slot />
        </main>

        <Footer />
    </div>
</template>
<script setup>
import { avatarSizeType } from '~~/constants/avatar.constants'
const { getters } = authStore

import { onMounted } from 'vue'
import { authStore } from '~~/composables/auth'

onMounted(() => {
    authStore.actions.setUser()
})

</script>
