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
    class="grid grid-cols-2 gap-4 p-4"
  >
    <ContentCard
      class="flex size-full max-w-[650px] flex-col justify-between text-center"
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
      class="flex size-full max-w-[650px] flex-col justify-between text-center"
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
@media (max-width: 600px), (min-width: 1200px) {
  #repayment-amount-cards {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>
