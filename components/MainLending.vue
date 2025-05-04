<template>
    <div class="main">
        <header class="main__header header">
            <NuxtLink to="/" style="text-decoration: none">
                <h1 style="font-weight: 900">Ypod</h1>
            </NuxtLink>

            <MainButton
                :theme="buttonThemeType.primary"
                :size="buttonSizeType.l"
                label="Login / Sign Up"
                @click="loginDialog = true"
                class="header__login-button"
            />
            <LoginView v-model:isModalOpen="loginDialog" />
        </header>
        <section>
            <h1>Ypod - make podcast from youtube playlist</h1>
            <p>
                Just mirror audio tracks from youtube playlist to simple webpage
                and rss
            </p>
        </section>

        <section id="features">
            <h2>Setup podcast in a minute</h2>
            <p>
                Provide a link to youtube playlist and we setup podcast for you
            </p>
            <div class="main__grid">
                <div class="main__border">
                    <h5>Simple webpage</h5>
                    <p style="text-align: left">
                        Simple webpage with list of episode
                    </p>
                </div>
                <div class="main__border">
                    <h5>RSS</h5>
                    <p style="text-align: left">
                        RSS feed for your podcast, which works with any podcast
                        application
                    </p>
                </div>
            </div>
        </section>

        <section id="get-started">
            <h3>Get Started</h3>
            <p>Ready to dive in? Login I will contact you via email</p>
            <MainButton
                :theme="buttonThemeType.primary"
                :size="buttonSizeType.l"
                label="Get started"
                @click="loginDialog = true"
                class="main__login-button"
            />
        </section>
    </div>
</template>

<script setup>
import { buttonSizeType, buttonThemeType } from '~~/constants/button.constants'
const loginDialog = useLoginDialog()
</script>

<style lang="scss">
.main {
    section {
        &__header {
            margin-left: auto;
            margin-right: auto;
            max-width: 1300px;
            width: 100%;
        }
        padding: 2rem;

        h1 {
            text-align: center;
            margin: 1.5rem 0;
        }

        h2 {
            text-align: center;
            margin: 1rem 0;
        }

        h3 {
            text-align: center;
            margin: 1rem 0;
        }

        h4 {
            text-align: center;
            margin: 1rem 0;
        }

        h5 {
            text-align: left;
            margin: 0 0;
        }

        p {
            margin: 1rem 0;
            text-align: center;
        }
    }

    ul {
        li {
            margin: 0.5rem 0;
        }
    }

    &__login-button {
        margin: 0 auto;
    }

    &__header {
        padding-top: 20px;
    }
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
