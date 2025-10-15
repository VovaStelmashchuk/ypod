import { computed, reactive, readonly, unref } from 'vue'
import { useFetch, useState } from 'nuxt/app'

const state = reactive({
    userIsSet: false,
    user: {}
})
async function setUser() {
    try {
        const { data } = await useFetch('/api/user', {
            credentials: 'include'
        })
        const userData = unref(data)
        if (userData && Boolean(userData.id)) {
            state.user = userData
            state.userIsSet = true
        } else {
            state.user = {}
            state.userIsSet = false
        }
    } catch (error) {
        console.error('Failed to set user:', error)
        state.user = {}
        state.userIsSet = false
    }
}

async function logout() {
    try {
        await $fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        state.user = {}
        state.userIsSet = false
    } catch (err) {
        console.error('Logout failed:', err)
    }
}

export const authStore = readonly({
    getters: {
        user: computed(() => state.user),
        userIsSet: computed(() => state.userIsSet)
    },
    actions: {
        setUser,
        logout
    }
})
