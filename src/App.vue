<script setup>
import { ref, computed, onMounted } from 'vue'
import PMT from './utils/PMT'
import CurrencyInput from './components/molecules/CurrencyInput.vue'
import SelectDropdown from './components/molecules/SelectDropdown.vue'
import RepaymentAmount from './components/organisms/RepaymentAmount.vue'
import CalculatorHeader from './components/atoms/CalculatorHeader.vue'
import ErrorAlert from './components/atoms/ErrorAlert.vue'
import {
  getLoanPurposesAsync,
  getRequestedRepaymentPeriodsAsync,
  getRequestedTermMonthsAsync,
} from './services/service'
const modelValue = ref(undefined)
const selectedLoanPurpose = ref(null)
const selectedRepaymentPeriod = ref(null)
const selectedTermMonth = ref(null)

const loanPurposes = ref([])
const requestedRepaymentPeriods = ref([])
const requestedTermMonths = ref([])

const loading = ref(true)

const outputPerPeriod = ref()
const repaymentPerPeriod = ref()

const displayedError = ref('')

onMounted(async () => {
  try {
    loanPurposes.value = await getLoanPurposesAsync()
    requestedRepaymentPeriods.value = await getRequestedRepaymentPeriodsAsync()
    requestedTermMonths.value = await getRequestedTermMonthsAsync()
  } catch (error) {
    displayedError.value = error.toString()
  } finally {
    loading.value = false
  }
})

const canCalculateRepayment = computed(() => {
  return (
    selectedLoanPurpose.value &&
    selectedRepaymentPeriod.value &&
    selectedTermMonth.value &&
    modelValue.value &&
    loanAmountInvalidMessage.value === ''
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
  if (isNaN(modelValue.value)) return 'Must be a number'
  if (Number(modelValue.value) < 1000) return 'Minimum amount: $1,000.00'
  if (Number(modelValue.value) > 20000000) return 'Maximum amount: $20,000,000.00'
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
  <CalculatorHeader />
  <div class="flex flex-col items-center gap-8 p-4 pt-12 border-b border-solid mx-4">
    <ErrorAlert
      v-if="displayedError"
      :error-message="displayedError"
      error-advice="Please refresh the page"
    />
    <div class="flex flex-col justify-center text-center w-fit">
      <p class="mr-2">I want to borrow</p>
      <CurrencyInput
        label="Loan amount"
        :model-value="modelValue"
        :error-message="loanAmountInvalidMessage"
        @update:model-value="updateLoanAmount"
      />
    </div>
    <div class="text-neutral-primary text-center leading-10">
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
  </div>
  <RepaymentAmount
    v-if="outputPerPeriod && selectedTermMonth"
    :repayment-amount="outputPerPeriod"
    :repayment-term="selectedTermMonth"
    :repayment-period="selectedRepaymentPeriod"
  />
</template>
