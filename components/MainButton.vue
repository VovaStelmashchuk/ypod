<template>
    <component :is="tag" :class="buttonClasses" v-bind="attr">
        <span v-if="Boolean(icon)" :class="iconClasses" />
        <span v-if="isLabelShow" class="font-bold">
            {{ label }}
        </span>
    </component>
</template>
<script setup>
import { computed, unref } from 'vue'
import {
    defaultButtonSizeType,
    defaultButtonThemeType
} from '~~/constants/button.constants'

const { label, icon, target, href, size, theme, isDisable, isLabelShow } =
    defineProps({
        label: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: ''
        },
        target: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: defaultButtonSizeType
        },
        theme: {
            type: String,
            default: defaultButtonThemeType
        },
        tag: {
            type: String,
            default: 'button'
        },
        isDisable: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        isLabelShow: {
            type: Boolean,
            default: true
        }
    })

const attr = computed(() => {
    const hrefValue = Boolean(unref(href)) ? { href: unref(href) } : {}
    const targetValue = Boolean(unref(target)) ? { target: unref(target) } : {}
    const titleValue = !unref(isLabelShow)
        ? { tilte: unref(label), 'aria-label': unref(label) }
        : {}
    return {
        ...hrefValue,
        ...targetValue,
        ...titleValue
    }
})

const sizeClasses = computed(() => {
    const s = unref(size)
    if (s === 's') return 'rounded-md p-2 text-xs'
    if (s === 'm') return 'rounded-lg p-3 text-sm'
    if (s === 'l') return 'rounded-lg px-4 py-3 h-12 text-base'
    return 'rounded-lg p-3 text-sm'
})

const themeClasses = computed(() => {
    const t = unref(theme)
    if (t === 'ghost') return 'text-gray-900 hover:bg-gray-100'
    if (t === 'secondary') return 'bg-gray-100 text-gray-900 hover:bg-gray-200'
    if (t === 'primary') return 'bg-gray-900 text-white hover:bg-gray-800'
    return 'bg-gray-100 text-gray-900'
})

const iconSizeClasses = computed(() => {
    const s = unref(size)
    if (s === 's') return 'w-3 h-3'
    if (s === 'm') return 'w-3.5 h-3.5'
    if (s === 'l') return 'w-3.5 h-3.5'
    return 'w-3.5 h-3.5'
})

const iconMaskClasses = computed(() => {
    const i = unref(icon)
    const masks = {
        'trash': '[mask-image:url(/icons/svg/trash.svg)]',
        'minus': '[mask-image:url(/icons/svg/minus.svg)]',
        'plus': '[mask-image:url(/icons/svg/plus.svg)]',
        'close': '[mask-image:url(/icons/svg/close.svg)]',
        'menu': '[mask-image:url(/icons/svg/menu.svg)]',
        'dark': '[mask-image:url(/icons/svg/dark.svg)]',
        'light': '[mask-image:url(/icons/svg/light.svg)]',
        'fullscreen': '[mask-image:url(/icons/svg/fullscreen.svg)]'
    }
    return masks[i] || ''
})

const iconColorClasses = computed(() => {
    const t = unref(theme)
    if (t === 'ghost') return 'bg-gray-900'
    if (t === 'secondary') return 'bg-gray-900'
    if (t === 'primary') return 'bg-white'
    return 'bg-gray-900'
})

const iconClasses = computed(() => {
    return `block ${unref(iconSizeClasses)} ${unref(iconMaskClasses)} ${unref(iconColorClasses)} [mask-size:contain]`
})

const buttonClasses = computed(() => {
    const disabled = unref(isDisable) ? 'pointer-events-none opacity-30' : ''
    return `flex items-center transition-all duration-300 w-max border-0 ${unref(sizeClasses)} ${unref(themeClasses)} ${disabled}`
})
</script>
