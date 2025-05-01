<template>
    <div class="main">
        <main class="main__content content">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="js"></script>
<style lang="scss" scoped>
.main {
    background-color: var(--background-primary);
    flex-direction: column;
    display: flex;
    min-height: 100vh;

    &__content {
        flex-grow: 1;
        margin: 0 auto;
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
</style>
