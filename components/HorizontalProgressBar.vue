<template>
    <div class="w-full">
        <div v-if="label" class="mb-2 text-sm text-gray-900 font-medium">
            {{ label }}
        </div>
        <div class="relative w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
            <div class="absolute top-0 left-0 h-full bg-gray-900 transition-all duration-300 ease-out"
                :style="{ width: `${progress}%` }" />
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-semibold" :class="progress > 50 ? 'text-white' : 'text-gray-900'">
                    {{ Math.round(progress) }}%
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    progress: number
    label?: string
}

const props = withDefaults(defineProps<Props>(), {
    progress: 0,
    label: ''
})
</script>
