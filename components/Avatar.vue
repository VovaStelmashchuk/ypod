<template>
    <component :is="avatarTag" v-bind="avatarHref" class="avatar">
        <img
            :class="avatarClasses"
            :src="user.avatar"
            :alt="user.name"
            class="avatar__img"
        />
    </component>
</template>
<script setup>
import { NuxtLink } from '#components'
import { computed, unref } from 'vue'
import { defaultAvatarSizeType } from '~~/constants/avatar.constants'

const { size } = defineProps({
    size: {
        type: String,
        default: defaultAvatarSizeType
    }
})

const route = useRoute()

const avatarClasses = computed(() => ({
    [`avatar__img--size-${unref(size)}`]: Boolean(unref(size))
}))
const isProfilePage = computed(() => {
    return route.path === '/profile'
})
const avatarTag = computed(() => {
    return unref(isProfilePage) ? 'div' : NuxtLink
})
const avatarHref = computed(() => {
    return !unref(isProfilePage) ? { to: '/profile' } : {}
})

const { getters } = authStore
const user = computed(() => getters.user)
</script>
<style lang="scss" scoped>
.avatar {
    &__img {
        border-radius: 100px;

        &--size-s {
            width: 40px;
            height: 40px;
        }
        &--size-m {
            width: 140px;
            height: 140px;
        }
    }
}
</style>
