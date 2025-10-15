<template>
    <div class="flex flex-row">
        <Avatar :size="avatarSizeType.m" class="mr-4" />
        <div class="flex flex-col">
            <h2 class="text-3xl font-semibold text-gray-900">{{ user.name }}</h2>
            <MainButton :theme="buttonThemeType.primary" @click="logoutHandler" label="Logout" />
        </div>
    </div>
</template>

<script setup>
import { buttonThemeType } from '~~/constants/button.constants'
import { avatarSizeType } from '~~/constants/avatar.constants'
const router = useRouter()

const { getters, actions } = authStore
const { logout } = actions
const user = computed(() => getters.user)

const logoutHandler = async () => {
    await logout()
    router.push({ path: '/' })
}
</script>
