<script setup>
const props = defineProps({
  clickable: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md p-4"
    :class="props.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow duration-300' : ''"
>
    <slot name="default"></slot>
  </div>
</template>
