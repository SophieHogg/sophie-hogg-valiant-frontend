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
    :name="label"
    :value="selectedValue"
    @change="onChange"
    class="w-fit bg-neutral-background border-solid border-b-2 border-brand-primary focus-visible:outline-none focus-visible:border-brand-focus"
    :class="!selectedValue ? 'text-gray-500' : ''"
  >
    <option disabled value="" class="gray-500">
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
