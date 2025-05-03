<template>
    <div class="main">
        <div class="container">
            <h1 class="container__title">404</h1>
            <h3>Page Not Found</h3>
            <NuxtLink to="/"><h2>Go Home</h2> </NuxtLink>
        </div>
    </div>
</template>

<style land="scss" scoped>
.main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
        margin: 100px;
    }
}
</style>
