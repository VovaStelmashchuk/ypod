<template>
    <div class="bg-gray-50 flex-col flex min-h-screen">
        <header class="mx-auto max-w-7xl w-full flex justify-between py-4 px-4">
            <a href="/">
                <h1 class="text-4xl font-black text-gray-900">Ypod</h1>
            </a>
        </header>

        <main class="flex-grow my-10 mx-auto max-w-7xl w-full px-4">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="js"></script>
