<template>
    <div class="main">
        <header class="main__header header">
            <NuxtLink to="/" style="text-decoration: none">
                <h1 style="font-weight: 900">YPod</h1>
            </NuxtLink>
            <Avatar :size="avatarSizeType.s" class="header__avatar" />
        </header>

        <main class="main__content content">
            <slot />
        </main>

        <Footer />
    </div>
</template>
<script setup>
import { avatarSizeType } from '~~/constants/avatar.constants'
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
    &__btn {
        position: fixed;
        bottom: 60px;
        right: 60px;
        z-index: 3;
    }
}
.content {
    padding-left: 10px;
    padding-right: 10px;
}
.header {
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
}
</style>
