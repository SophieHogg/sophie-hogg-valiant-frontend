<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Select...',
  },
})
const emit = defineEmits(['update:modelValue'])

const onChange = (e) => {
  const val = e.target.value
  const obj = props.options.find(opt => String(opt.value) === val)
  emit('update:modelValue', obj || null)
}

const selectedValue = computed(() => (props.modelValue ? props.modelValue.value : ''))
</script>

<template>
  <select
    :value="selectedValue"
    @change="onChange"
    class="border rounded px-2 py-1 w-full"
  >
    <option disabled value="">
      {{ placeholder }}
    </option>
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>
