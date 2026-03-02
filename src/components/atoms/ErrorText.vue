<script setup>
const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
    required: true,
  },
})
</script>

<template>
  <div class="text-red-500">
    {{ props.errorMessage }}
  </div>
</template>
