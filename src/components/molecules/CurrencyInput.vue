<script setup>
import ErrorText from '../atoms/ErrorText.vue'
import { ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  label: {
    type: String,
    default: 'Currency Input',
  },
  placeholder: {
    type: String,
    default: '0.00',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const formattedValue = ref()

const formatValue = () => {
  if (!props.modelValue) return ''
  const num = Number(props.modelValue)
  if (isNaN(num)) return props.modelValue
  formattedValue.value = num.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const onInput = (event) => {
  formattedValue.value = undefined
  const roundedValue = Math.round(Number(event.target.value) * 100) / 100
  emit('update:modelValue', roundedValue)
}

const onPasteOrDrop = (event) => {
  // I've decided here to prevent pasting/dropping non-numeric content entirely (as opposed to filtering them out)
  // This is because it provides a better UX
  // if we allowed pasting and then filtered out non-numeric characters, it could lead to confusion if the user doesn't understand why their input was modified.

  const pastedData = event.clipboardData.getData('text')
  if (/^[\d.]+$/.test(pastedData)) {
    emit('update:modelValue', parseFloat(pastedData, 10))
  }
}

const allowedKeys = [
  'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End',
]

const onBlur = () => {
  formatValue()
}
const onKeyDown = (event) => {
  const { key, target } = event
  if (
    // Allow only one dot
    (key === '.' && !target.value.includes('.')) ||
    // Allow digits
    (/\d/.test(key)) ||
    // Allow navigation keys
    allowedKeys.includes(key) ||
    // Allow Ctrl/Cmd+letters
    (event.ctrlKey || event.metaKey)
  ) return

  // Block everything else
  event.preventDefault()
}
</script>

<template>
  <div class="relative inline-block">
    <p class="absolute p-1 text-3xl">
      $
    </p>
    <input
      :id
      type="text"
      :value="formattedValue ?? props.modelValue"
      inputmode="decimal"
      autocomplete="off"
      spellcheck="false"
      :aria-label="props.label"
      :placeholder="props.placeholder"
      class="w-fit border-b-2 border-solid border-brand-primary bg-neutral-background py-1 pl-8 pr-2 text-right text-3xl placeholder:text-gray-500 focus-visible:border-brand-focus focus-visible:outline-none"
      @input="onInput"
      @keydown="onKeyDown"
      @paste.prevent="onPasteOrDrop"
      @drop.prevent="onPasteOrDrop"
      @blur="onBlur"
      @focus="formattedValue = undefined"
    >
  </div>
  <ErrorText
    v-if="props.errorMessage"
    :error-message="props.errorMessage"
  />
</template>
