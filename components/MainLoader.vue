<template>
    <div class="loader" />
</template>
<script setup></script>
<style lang="scss" scoped>
.loader {
    position: relative;

    &::after {
        top: 50%;
        left: 50%;
        width: 1px;
        height: 1px;
        content: '';
        position: absolute;
        transform: translate(-50%, -50%);
        color: var(--accent-primary);
        animation-duration: 6s;
        animation-iteration-count: infinite;
        box-shadow:
            -20px -20px 0 16px,
            -20px -20px 0 16px,
            -20px -20px 0 16px,
            -20px -20px 0 16px;
        animation-name: loader;
    }
}

@keyframes loader {
    0%,
    100% {
        box-shadow:
            -20px -20px 0 16px,
            -20px -20px 0 16px,
            -20px -20px 0 16px,
            -20px -20px 0 16px;
    }
    8.33%,
    91.63% {
        box-shadow:
            -20px -20px 0 16px,
            20px -20px 0 16px,
            20px -20px 0 16px,
            20px -20px 0 16px;
    }
    16.66%,
    83.3% {
        box-shadow:
            -20px -20px 0 16px,
            20px -20px 0 16px,
            20px 20px 0 16px,
            20px 20px 0 16px;
    }
    24.99%,
    74.97% {
        box-shadow:
            -20px -20px 0 16px,
            20px -20px 0 16px,
            20px 20px 0 16px,
            -20px 20px 0 16px;
    }
    33.32%,
    66.64% {
        box-shadow:
            -20px -20px 0 16px,
            20px -20px 0 16px,
            20px 20px 0 16px,
            -20px -20px 0 16px;
    }
    41.65%,
    58.31% {
        box-shadow:
            20px -20px 0 16px,
            20px -20px 0 16px,
            20px 20px 0 16px,
            20px -20px 0 16px;
    }
    49.98% {
        box-shadow:
            20px 20px 0 16px,
            20px 20px 0 16px,
            20px 20px 0 16px,
            20px 20px 0 16px;
    }
}
</style>
