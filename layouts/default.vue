<template>
    <div class="main">
        <header class="main__header header">
            <NuxtLink to="/" style="text-decoration: none">
                <h1 style="font-weight: 900">KickStart</h1>
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

        <main class="main__content content">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="js">
import { buttonSizeType, buttonThemeType } from '~~/constants/button.constants'
const loginDialog = useLoginDialog()
</script>
<style lang="scss" scoped>
.main {
    background-color: var(--background-primary);
    flex-direction: column;
    display: flex;
    min-height: 100vh;

    &__header {
        margin-left: auto;
        margin-right: auto;
        max-width: 1300px;
        width: 100%;
    }
    &__content {
        flex-grow: 1;
        margin: 40px auto;
        max-width: 1300px;
        width: 100%;
    }
    &__line {
        position: relative;
        z-index: 2;
    }
}
.content {
    padding-left: 10px;
    padding-right: 10px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
