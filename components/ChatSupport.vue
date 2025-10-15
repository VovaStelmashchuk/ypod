<template>
    <div class="fixed top-0 right-0 w-full h-full z-40 flex justify-end">
        <div @click="supportDialog = false" class="absolute top-0 right-0 w-full h-full bg-gray-500/30"></div>
        <div class="z-10 relative bg-white w-[400px] p-4 flex flex-col">
            <div class="flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-900">Support Chat</h3>
                <MainButton label="close modal" :isLabelShow="false" :size="buttonSizeType.s"
                    :theme="buttonThemeType.primary" @click="supportDialog = false" />
            </div>
            <div class="rounded-lg border border-gray-200 flex-grow p-3 mt-2.5 mb-2.5 overflow-auto mr-0">
                <p v-for="msg in messages" :key="msg._id" :class="getMessageClasses(msg.sender)"
                    class="py-1.5 px-2 rounded-tr-lg rounded-br-lg rounded-bl-lg mb-2.5 text-gray-900 text-sm leading-relaxed w-max max-w-full mr-auto text-left bg-gray-200">
                    {{ msg.message }}
                </p>
            </div>
            <div class="flex items-center">
                <InputField placeholder="Type your message..." class="flex-grow" v-model="message"
                    @keyup.enter="sendMessage" />
                <MainButton :theme="buttonThemeType.primary" @click="sendMessage" label="Send" class="ml-2.5" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { buttonSizeType, buttonThemeType } from '~~/constants/button.constants'
import { ref, onMounted, onBeforeUnmount, unref } from 'vue'

const supportDialog = useSupportDialog()

const message = ref('')
const messages = ref([])
const messagesContainer = ref(null)
const eventSource = ref(null)

const sendMessage = async () => {
    if (!message.value.trim()) return

    try {
        await $fetch('/api/support/messages', {
            method: 'POST',
            body: { message: message.value }
        })
        message.value = ''
    } catch (error) {
        console.error('Failed to send message:', error)
    }
}

onMounted(() => {
    eventSource.value = new EventSource('/api/support/messages')

    unref(eventSource).onmessage = (event) => {
        console.log('Received SSE message:', event.data)
        try {
            const parsed = JSON.parse(event.data)
            if (parsed.type === 'initial') {
                messages.value = parsed.data
            } else if (parsed.type === 'newMessages') {
                messages.value.push(...parsed.data)
            }
        } catch (e) {
            console.error('Error parsing SSE message:', e)
        }
    }

    unref(eventSource).onerror = (err) => {
        console.error('SSE connection error:', err)
    }
})
onBeforeUnmount(() => {
    if (unref(eventSource)) {
        unref(eventSource).close()
    }
})

const getMessageClasses = (sender) => ({
    'ml-auto mr-0 text-right bg-gray-100 rounded-tl-lg rounded-bl-lg rounded-br-lg text-gray-600': sender === 'user'
})
</script>

<style scoped>
/* No custom styles needed - all in Tailwind classes */
</style>
