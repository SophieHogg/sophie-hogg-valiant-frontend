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
    class="rounded-lg bg-white p-4 shadow-md"
    :class="props.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow duration-300' : ''"
  >
    <slot name="default" />
  </div>
</template>
