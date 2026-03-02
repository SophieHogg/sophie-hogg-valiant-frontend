<script setup>
import { ref, computed, onMounted } from 'vue'
import PMT from './utils/PMT'
import CurrencyInput from './components/molecules/CurrencyInput.vue'
import SelectDropdown from './components/molecules/SelectDropdown.vue'
import RepaymentAmount from './components/organisms/RepaymentAmount.vue'
import {
  getLoanPurposesAsync,
  getRequestedRepaymentPeriodsAsync,
  getRequestedTermMonthsAsync,
} from './services/service'

const modelValue = ref('')
const selectedLoanPurpose = ref(null)
const selectedRepaymentPeriod = ref(null)
const selectedTermMonth = ref(null)

const loanPurposes = ref([])
const requestedRepaymentPeriods = ref([])
const requestedTermMonths = ref([])

const loading = ref(true)

const outputPerPeriod = ref()
const repaymentPerPeriod = ref()

onMounted(async () => {
  try {
    loanPurposes.value = await getLoanPurposesAsync()
    requestedRepaymentPeriods.value = await getRequestedRepaymentPeriodsAsync()
    requestedTermMonths.value = await getRequestedTermMonthsAsync()
  } finally {
    loading.value = false
  }
})

const canCalculateRepayment = computed(() => {
  return (
    selectedLoanPurpose.value &&
    selectedRepaymentPeriod.value &&
    selectedTermMonth.value &&
    modelValue.value
  )
})

const handleDataChange = () => {
  if (!canCalculateRepayment.value) return
  // TODO: Validation and error states
  repaymentPerPeriod.value = selectedLoanPurpose.value.annualRate / selectedRepaymentPeriod.value.value
  outputPerPeriod.value = PMT(repaymentPerPeriod.value, selectedTermMonth.value.value, modelValue.value)
}

const loanAmountInvalidMessage = computed(() => {
  // If the user hasn't tried to enter anything, don't blast them with errors
  if (!isLoanAmountDirty.value) return ''
  if (!modelValue.value) return 'Loan amount is required'
  if (isNaN(modelValue.value)) return 'Loan amount must be a number'
  if (Number(modelValue.value) < 1000) return 'Loan amount must be greater than $1,000.00'
  if (Number(modelValue.value) > 20000000) return 'Loan amount must be less than $20,000,000.00'
  return ''
})

const isLoanAmountDirty = ref(false)

const updateLoanAmount = (value) => {
  isLoanAmountDirty.value = true
  modelValue.value = value
  handleDataChange()
}

const updateSelectedLoanPurpose = (value) => {
  selectedLoanPurpose.value = value
  handleDataChange()
}

const updateSelectedRepaymentPeriod = (value) => {
  selectedRepaymentPeriod.value = value
  handleDataChange()
}

const updateSelectedTermMonth = (value) => {
  selectedTermMonth.value = value
  handleDataChange()
}
</script>

<template>
  <div class="text-neutral-primary">

    <CurrencyInput
      label="Loan amount"
      :model-value="modelValue"
      :error-message="loanAmountInvalidMessage"
      @update:model-value="updateLoanAmount"
    />
    I'd like a loan for
    <SelectDropdown
      label="Loan purpose"
      :model-value="selectedLoanPurpose"
      :options="loanPurposes"
      placeholder="Loan purpose"
      @update:model-value="updateSelectedLoanPurpose"
    />
    to be repaid
    <SelectDropdown
      label="Repayment period"
      :model-value="selectedRepaymentPeriod"
      :options="requestedRepaymentPeriods"
      placeholder="Repayment period"
      @update:model-value="updateSelectedRepaymentPeriod"
    />
    over the course of
    <SelectDropdown
      label="Term"
      :model-value="selectedTermMonth"
      :options="requestedTermMonths"
      placeholder="Repayment term"
      @update:model-value="updateSelectedTermMonth"
    />
    .
  </div>
  <RepaymentAmount
    v-if="outputPerPeriod && selectedTermMonth"
    :repayment-amount="outputPerPeriod"
    :repayment-term="selectedTermMonth.value"
  />
</template>
