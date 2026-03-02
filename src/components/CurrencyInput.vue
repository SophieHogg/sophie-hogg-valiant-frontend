<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: 'Currency Input',
  },
  errorMessage: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onPasteOrDrop = (event) => {
  // I've decided here to prevent pasting/dropping non-numeric content entirely (as opposed to filtering them out)
  // This is because it provides a better UX
  // if we allowed pasting and then filtered out non-numeric characters, it could lead to confusion if the user doesn't understand why their input was modified.

  const pastedData = event.clipboardData.getData('text')
  if (/^[\d.]+$/.test(pastedData)) {
    emit('update:modelValue', pastedData)
  }
}

const allowedKeys = [
  'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End',
]

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
  <input
    type="text"
    :value="props.modelValue"
    inputmode="decimal"
    autocomplete="off"
    spellcheck="false"
    :aria-label="props.label"
    class="border rounded px-2 py-1 w-full"
    @input="onInput"
    @keydown="onKeyDown"
    @paste.prevent="onPasteOrDrop"
    @drop.prevent="onPasteOrDrop"
  />
  <div v-if="props.errorMessage" class="text-red-500">
    {{ props.errorMessage }}
  </div>
</template>
