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
  <div class="flex flex-row gap-4 items-center justify-center p-4">
    <ContentCard class="h-[stretch] flex flex-col justify-between text-center w-96">
      <p>
        Your {{ repaymentPeriod.label.toLowerCase() }} repayment amount is
      </p>
      <TooltipPopup :content="repaymentAmountTooltipContent" selector-id="#repayment-amount-by-period">
        <p class="text-lg font-bold" id="repayment-amount-by-period">
          {{ formatCurrency(-roundedRepaymentAmount, 'AUD') }}
        </p>
      </TooltipPopup>
    </ContentCard>
    <ContentCard class="h-[stretch] flex flex-col justify-between text-center w-96">
      <p>
        Your total repayment amount over {{ repaymentTerm.label }} is
      </p>
      <TooltipPopup :content="totalRepaymentAmountTooltipContent" selector-id="#total-repayment-amount">
        <p class="text-lg font-bold" id="total-repayment-amount">
          {{ formatCurrency(-roundedRepaymentAmount * repaymentTerm.value, 'AUD') }}
        </p>
      </TooltipPopup>
    </ContentCard>
  </div>
</template>
