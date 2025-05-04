<template>
    <div class="podcast">
        <NuxtLink to="/" style="text-decoration: none">
            <h1 class="podcast__title">{{ data.showName }}</h1>
        </NuxtLink>
    </div>
    <div class="podcast__sync-block">
        <MainButton
            :theme="buttonThemeType.primary"
            label="Sync with youtube playlist"
            class="podcast__sync-button"
            @click="syncPlaylist"
        />
        <div style="--loader-size: 16px" v-if="isSyncInProgress">
            <MainLoader />
        </div>
    </div>
    <div class="main__grid">
        <div v-for="episode in data.episodes">
            <img
                :src="episode.image"
                alt="Podcast logo"
                style="
                    width: 100%;
                    height: auto;
                    margin: 0;
                    border-radius: 1rem;
                "
            />
            <p>{{ episode.title }}</p>
        </div>
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

const syncPlaylist = async () => {
    isSyncInProgress.value = true
    await useFetch(`/api/dashboard/${showSlug}/sync`, {
        method: 'POST'
    })
    isSyncInProgress.value = false
}
</script>

<style lang="scss" scoped>
.podcast {
    &__sync-block {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }
    &__sync-button {
        margin: 8px 0;
    }
}
</style>
