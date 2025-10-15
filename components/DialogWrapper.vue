<template>
    <teleport to="body">
        <div v-if="isModalOpen"
            class="text-xs leading-tight flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-20">
            <div class="absolute top-0 right-0 bottom-0 left-0 bg-gray-500/30" @click="closeModal"></div>

            <div class="relative z-10 bg-white rounded-2xl max-h-[94vh] max-w-[94vw]">
                <MainButton label="close modal" :isLabelShow="false" :size="buttonSizeType.s" :icon="iconType.close"
                    @click="closeModal" class="absolute top-2 right-2" />
                <slot />
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { buttonSizeType, buttonThemeType } from '~~/constants/button.constants'
import { iconType } from '~~/constants/icon.constants'

const { isModalOpen } = defineProps({
    isModalOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:isModalOpen'])

const closeModal = () => {
    emit('update:isModalOpen', false)
}
</script>
