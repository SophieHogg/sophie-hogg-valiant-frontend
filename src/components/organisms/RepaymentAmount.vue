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
  repaymentTermLabel: {
    required: true,
    type: String,
  },
  totalRepaymentPeriods: {
    required: true,
    type: Number,
  },
  repaymentPeriodLabel: {
    required: true,
    type: String,
  },
})

const roundedRepaymentAmount = computed(() => {
  return Math.round(props.repaymentAmount)
})

const repaymentAmountTooltipContent = computed(() => {
  return formatCurrency(Math.round(-props.repaymentAmount * 100) / 100)
})

const totalRepaymentAmountTooltipContent = computed(() => {
  const currency = formatCurrency((Math.round(-props.repaymentAmount * props.totalRepaymentPeriods * 100) / 100))
  return `Rounded from ${repaymentAmountTooltipContent.value} * ${props.totalRepaymentPeriods} = ${currency}`
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
        Your {{ repaymentPeriodLabel.toLowerCase() }} repayment amount is
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
        Your total repayment amount over {{ repaymentTermLabel }} is
      </p>
      <TooltipPopup
        :content="totalRepaymentAmountTooltipContent"
        selector-id="#total-repayment-amount"
      >
        <p
          id="total-repayment-amount"
          class="text-lg font-bold"
        >
          {{ formatCurrency(-roundedRepaymentAmount * totalRepaymentPeriods, 'AUD') }}
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
