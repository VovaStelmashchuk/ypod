<template>
    <div class="profile">
        <Avatar :size="avatarSizeType.m" class="profile__avatar" />
        <div class="profile__content">
            <h2>{{ user.name }}</h2>
            <MainButton
                :theme="buttonThemeType.primary"
                @click="logoutHandler"
                label="Logout"
            />
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

<style scoped lang="scss">
.profile {
    display: flex;
    flex-flow: row;

    &__avatar {
        margin-right: 1rem;
    }

    &__content {
        display: flex;
        flex-flow: column;
    }
}
</style>
