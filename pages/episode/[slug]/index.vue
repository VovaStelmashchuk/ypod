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
        <h2 class="podcast__title">{{ data.title }}</h2>
        <div class="podcast__content">
            <div class="videoWrapper">
                <iframe
                    :src="`https://www.youtube.com/embed/${data.youtubeVideoId}`"
                    :title="`${data.title}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
        <p style="margin-top: 24px">{{ data.description }}</p>
        <audio style="margin-top: 24px" controls :src="data.audioUrl"></audio>
    </div>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'
import { useFetch } from 'nuxt/app'

const route = useRoute()
const slug = route.params.slug

const { data } = await useFetch(`/api/podcast/--auto-slug--/${slug}`)
</script>

<style lang="scss" scoped>
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    padding-top: 25px;
    height: 0;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.podcast {
    &__title {
        padding: 20px;
        text-align: center;
    }

    &__link-button {
        width: 100%;
        text-align: center;
    }

    &__content {
        margin-top: 20px;
    }
}
</style>
