<script setup>
import { ref, watch, onMounted } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  selectorId: {
    type: String,
    required: true,
  },
})

const tooltip = ref(null)

const initializeTooltip = () => {
  tooltip.value = tippy(document.querySelector(props.selectorId), {
    content: props.content,
    trigger: 'mouseenter',
    hideOnClick: true,
  })
}

onMounted(() => {
  initializeTooltip()
})

watch(() => props.content, (newContent) => {
  if (tooltip.value) {
    tooltip.value.setContent(newContent)
  }
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
