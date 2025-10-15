<template>
    <label :class="inputClasses">
        <span v-if="prefix" class="text-gray-600 flex-shrink-0 mr-2 transition-opacity duration-300">
            {{ prefix }}
        </span>
        <input :type="type" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="text-gray-900 flex-grow bg-transparent outline-none min-w-[26px] transition-opacity duration-300" />
        <span v-if="suffix" class="text-gray-600 flex-shrink-0 ml-2 transition-opacity duration-300">
            {{ suffix }}
        </span>
    </label>
</template>

<script setup>
import { computed } from 'vue'

const { isDisable } = defineProps({
    prefix: {
        type: String,
        default: ''
    },
    suffix: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    isDisable: {
        type: Boolean,
        default: false
    }
})

const inputClasses = computed(() => {
    const base = 'rounded-lg bg-gray-100 p-3 flex items-center font-medium border-2 border-transparent transition-all duration-300'
    const hover = 'hover:bg-gray-200'
    const focus = 'focus-within:border-gray-900'
    const disabled = isDisable ? 'pointer-events-none [&>*]:opacity-30' : ''
    return `${base} ${hover} ${focus} ${disabled}`
})
</script>
