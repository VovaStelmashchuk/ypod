<template>
    <teleport to="body">
        <div v-if="isModalOpen" class="modal">
            <div class="modal__background" @click="closeModal"></div>

            <div class="modal__body modal-body">
                <MainButton
                    label="close modal"
                    :isLabelShow="false"
                    :size="buttonSizeType.s"
                    :icon="iconType.close"
                    @click="closeModal"
                    class="modal-body__close"
                />
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

<style lang="scss" scoped>
.modal {
    font-size: 12px;
    font-family: $sf_mono;
    line-height: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;

    &__background {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--label-tertiary);
    }
    &__body {
        position: relative;
        z-index: 1;
        background-color: var(--background-primary);
        border-radius: 16px;
        max-height: 94vh;
        max-width: 94vw;
    }
}
.modal-body {
    &__close {
        position: absolute;
        top: 8.5px;
        right: 8.5px;
    }
}
</style>
