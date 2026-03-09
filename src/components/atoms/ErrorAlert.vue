<script setup>
import TooltipPopup from './TooltipPopup.vue'

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
  errorDetail: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex flex-col w-fit rounded-lg border-2 border-solid border-red-800 bg-red-200 px-4 py-2 text-red-800">
    <span class="block w-full text-center text-4xl"> ⚠ </span>
    <h3 class="font-semibold">
      {{ errorMessage }}
    </h3>
    <small class="text-sm"> {{ errorAdvice }} </small>
    <TooltipPopup v-if="errorDetail" :content="errorDetail" selector-id="#developer-notes" class="w-full flex flex-row justify-end">
      <span id="developer-notes">ⓘ</span>
    </TooltipPopup>
  </div>
</template>
