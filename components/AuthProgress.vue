<template>
    <div class="authenticating">
        <h2>Authenticating...</h2>
        <MainLoader class="authenticating__loader" />
        <p>Please wait a moment while we process your authentication.</p>
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.authenticating {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &__loader {
        margin-top: 20px;
        margin-bottom: 40px;
        width: 120px;
        height: 120px;
    }
}
</style>
