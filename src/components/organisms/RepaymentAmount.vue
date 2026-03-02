<script setup>
import ContentCard from '../atoms/ContentCard.vue'
import { computed } from 'vue'
const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
  repaymentAmount: {
    required: true,
    type: Number,
    default: null,
  },
  repaymentTerm: {
    required: true,
    type: Number,
  },
})

const formatCurrency = (amount, currencyCode, locale = 'en-AU') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}

const roundedRepaymentAmount = computed(() => {
  return Math.round(props.repaymentAmount)
})
</script>

<template>
  <div class="flex flex-row gap-4 items-center justify-center p-4">
    <ContentCard class="w-fit text-center">
      <p>
        Your estimated monthly repayment amount is
      </p>
      <p class="text-lg font-bold">
        {{ formatCurrency(-roundedRepaymentAmount, 'AUD') }}
      </p>
    </ContentCard>
    <ContentCard class="w-fit text-center">
      <p>
        Your estimated total repayment amount is
      </p>
      <p class="text-lg font-bold">
        {{ formatCurrency(-roundedRepaymentAmount * repaymentTerm, 'AUD') }}
      </p>
    </ContentCard>
  </div>
</template>
