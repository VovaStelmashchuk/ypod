<template>
    <div class="podcast">
        <h1 class="podcast__title">{{ data.showName }}</h1>
        <div class="main__grid">
            <MainButton
                v-for="link in data.links"
                :theme="buttonThemeType.primary"
                :label="link.text"
                :href="link.link"
                tag="a"
                target="_blank"
                class="podcast__link-button"
            />
        </div>
        <div class="main__grid episodes">
            <div v-for="episode in data.episodes" class="episodes__episode">
                <NuxtLink :to="`/episode/${episode.slug}`">
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
                    <h5 class="episodes__title">{{ episode.title }}</h5>
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

<style lang="scss" scoped>
.podcast {
    &__title {
        padding: 20px;
        text-align: center;
    }

    &__link-button {
        width: 100%;
        text-align: center;
    }
}
.episodes {
    margin-top: 20px;

    &__episode {
        background-color: var(--fill-secondary);
        border-radius: 1rem;
    }

    &__title {
        padding: 20px;
        text-align: left;
    }
}
</style>
