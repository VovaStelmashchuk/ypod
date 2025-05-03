<template>
    <div class="loader" />
</template>
<script setup></script>
<style lang="scss" scoped>
.loader {
    border: calc(var(--loader-size, 120px) / 5) solid var(--fill-tertiary);
    border-top: calc(var(--loader-size, 120px) / 5) solid var(--accent-primary);
    border-radius: 50%;
    width: var(--loader-size, 120px);
    height: var(--loader-size, 120px);
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
