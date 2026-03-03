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
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select...',
  },
  id: {
    required: true,
    type: String,
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
    :id
    :name="label"
    :value="selectedValue"
    :class="!selectedValue ? 'text-gray-500' : ''"
    class="w-fit cursor-pointer border-b-2 border-solid border-brand-primary bg-neutral-background focus-visible:border-brand-focus focus-visible:outline-none"
    @change="onChange"
  >
    <option
      disabled
      value=""
      class="text-gray-500"
    >
      {{ placeholder }}
    </option>
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label.toLowerCase() }}
    </option>
  </select>
</template>
