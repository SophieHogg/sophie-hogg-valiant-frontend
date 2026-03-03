<script setup>
import ContentCard from '../atoms/ContentCard.vue'
import TooltipPopup from '../atoms/TooltipPopup.vue'
import formatCurrency from '@/utils/formatCurrency'

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
    type: Object,
  },
  repaymentPeriod: {
    required: true,
    type: Object,
  },
})

const roundedRepaymentAmount = computed(() => {
  return Math.round(props.repaymentAmount)
})

const repaymentAmountTooltipContent = computed(() => {
  return formatCurrency(Math.round(-props.repaymentAmount * 100) / 100)
})

const totalRepaymentAmountTooltipContent = computed(() => {
  const currency = formatCurrency((Math.round(-props.repaymentAmount * props.repaymentTerm.value * 100) / 100))
  return `Rounded from ${repaymentAmountTooltipContent.value} * ${props.repaymentTerm.value} = ${currency}`
})
</script>

<template>
  <div
    id="repayment-amount-cards"
    class="flex flex-row items-center justify-center gap-4 p-4"
  >
    <ContentCard
      id="term-repayment-card"
      class="flex h-full w-96 flex-1 flex-col justify-between text-center"
    >
      <p>
        Your {{ repaymentPeriod.label.toLowerCase() }} repayment amount is
      </p>
      <TooltipPopup
        :content="repaymentAmountTooltipContent"
        selector-id="#repayment-amount-by-period"
      >
        <p
          id="repayment-amount-by-period"
          class="text-lg font-bold"
        >
          {{ formatCurrency(-roundedRepaymentAmount, 'AUD') }}
        </p>
      </TooltipPopup>
    </ContentCard>
    <ContentCard
      id="total-repayment-card"
      class="flex h-full w-96 flex-1 flex-col justify-between text-center"
    >
      <p>
        Your total repayment amount over {{ repaymentTerm.label }} is
      </p>
      <TooltipPopup
        :content="totalRepaymentAmountTooltipContent"
        selector-id="#total-repayment-amount"
      >
        <p
          id="total-repayment-amount"
          class="text-lg font-bold"
        >
          {{ formatCurrency(-roundedRepaymentAmount * repaymentTerm.value, 'AUD') }}
        </p>
      </TooltipPopup>
    </ContentCard>
  </div>
</template>

<style scoped>
#term-repayment-card, #total-repayment-card {
  /* fallback for h-full for MacOS and iOS */
  height: -webkit-fill-available
}
@media (max-width: 600px) {
  #repayment-amount-cards {
    flex-direction: column;
  }
}
</style>
