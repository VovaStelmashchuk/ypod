<template>
    <div class="main">
        <header class="main__header header">
            <a href="/"><h1 style="font-weight: 900">Ypod</h1></a>
        </header>

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
    padding: 16px 10px;
}
</style>
