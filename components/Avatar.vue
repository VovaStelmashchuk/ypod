<template>
    <component :is="avatarTag" v-bind="avatarHref">
        <img v-if="user.avatar" :class="avatarClasses" :src="user.avatar" :alt="user.name || 'User avatar'" />
    </component>
</template>
<script setup>
import { NuxtLink } from '#components'
import { computed, unref } from 'vue'
import { defaultAvatarSizeType } from '~~/constants/avatar.constants'
import { authStore } from '~~/composables/auth'

const { size } = defineProps({
    size: {
        type: String,
        default: defaultAvatarSizeType
    }
})

const route = useRoute()

const avatarClasses = computed(() => {
    const s = unref(size)
    const sizeClass = s === 's' ? 'w-10 h-10' : s === 'm' ? 'w-35 h-35' : 'w-10 h-10'
    return `rounded-full ${sizeClass}`
})

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
