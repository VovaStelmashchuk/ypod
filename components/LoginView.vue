<template>
    <DialogWrapper>
        <div class="flex flex-col items-center py-12 px-6">
            <h1 class="text-4xl font-bold text-gray-900">Login to your account</h1>
            <div class="flex items-center mt-3.5">
                <img src="/google-logo.svg" loading="lazy" alt="google logo" class="mr-2.5 w-6 h-auto" />
                <MainButton :theme="buttonThemeType.secondary" @click="doAuth('google')" label="Login with Google" />
            </div>
        </div>
    </DialogWrapper>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'

const doAuth = async (provider) => {
    const response = await $fetch(`/api/auth/${provider}/redirect`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    navigateTo(response.url, { external: true })
}
</script>
