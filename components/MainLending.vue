<template>
    <div>
        <header class="flex justify-between items-center pt-5">
            <NuxtLink to="/" class="no-underline">
                <h1 class="text-4xl font-black text-gray-900">Ypod</h1>
            </NuxtLink>

            <MainButton :theme="buttonThemeType.primary" :size="buttonSizeType.l" label="Login / Sign Up"
                @click="loginDialog = true" />
            <LoginView v-model:isModalOpen="loginDialog" />
        </header>

        <section class="p-8">
            <h1 class="text-4xl font-bold text-center my-6 text-gray-900">Ypod - make podcast from youtube playlist</h1>
            <p class="text-base text-center my-4 text-gray-900">
                Just mirror audio tracks from youtube playlist to simple webpage
                and rss
            </p>
        </section>

        <section id="features" class="p-8">
            <h2 class="text-3xl font-semibold text-center my-4 text-gray-900">Setup podcast in a minute</h2>
            <p class="text-base text-center my-4 text-gray-900">
                Provide a link to youtube playlist and we setup podcast for you
            </p>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                <div class="border border-gray-300 rounded-lg p-4">
                    <h5 class="text-xl font-bold text-left m-0 text-gray-900">Simple webpage</h5>
                    <p class="text-base text-left my-4 text-gray-900">
                        Simple webpage with list of episode
                    </p>
                </div>
                <div class="border border-gray-300 rounded-lg p-4">
                    <h5 class="text-xl font-bold text-left m-0 text-gray-900">RSS</h5>
                    <p class="text-base text-left my-4 text-gray-900">
                        RSS feed for your podcast, which works with any podcast
                        application
                    </p>
                </div>
            </div>
        </section>

        <section id="get-started" class="p-8">
            <h3 class="text-2xl font-bold text-center my-4 text-gray-900">Get Started</h3>
            <p class="text-base text-center my-4 text-gray-900">Ready to dive in? Login I will contact you via email</p>
            <MainButton :theme="buttonThemeType.primary" :size="buttonSizeType.l" label="Get started"
                @click="loginDialog = true" class="mx-auto" />
        </section>
    </div>
</template>

<script setup>
import { buttonSizeType, buttonThemeType } from '~~/constants/button.constants'
const loginDialog = useLoginDialog()
</script>
