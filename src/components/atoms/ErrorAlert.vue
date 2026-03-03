<script setup>
defineProps({
  errorMessage: {
    type: String,
    default: '',
    required: true,
  },
  errorAdvice: {
    type: String,
    default: '',
    required: true,
  },
})
</script>

<template>
  <div class="bg-red-200 text-red-800 px-4 py-2 w-fit rounded-lg border-solid border-2 border-red-800">
    <span class="text-center w-full text-4xl block"> ⚠ </span>
    <h3 class="font-semibold"> {{ errorMessage }} </h3>
    <small class="text-sm"> {{errorAdvice}} </small>
  </div>
</template>
