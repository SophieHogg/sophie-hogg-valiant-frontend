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
const totalRepaymentPeriods = ref(0)
const displayedError = ref('')
const errorDetail = ref()

onMounted(async () => {
  try {
    const [loanPurposesResult, requestedRepaymentPeriodsResult, requestedTermMonthsResult] = await Promise.all([
      getLoanPurposesAsync(),
      getRequestedRepaymentPeriodsAsync(),
      getRequestedTermMonthsAsync(),
    ])
    loanPurposes.value = loanPurposesResult
    requestedRepaymentPeriods.value = requestedRepaymentPeriodsResult
    requestedTermMonths.value = requestedTermMonthsResult
  } catch (error) {
    displayedError.value = 'Form loading failed'
    errorDetail.value = `${error.toString()} with status ${error.cause}`
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
  repaymentPerPeriod.value = selectedLoanPurpose.value.annualRate / selectedRepaymentPeriod.value.value
  const repaymentPeriodInYears = selectedTermMonth.value.value / 12
  totalRepaymentPeriods.value = repaymentPeriodInYears * selectedRepaymentPeriod.value.value
  outputPerPeriod.value = PMT(repaymentPerPeriod.value, totalRepaymentPeriods.value, modelValue.value)
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
  <div class="mx-4 flex flex-col items-center gap-8 border-b border-solid p-4 pt-12">
    <ErrorAlert
      v-if="displayedError"
      :error-message="displayedError"
      error-advice="Please refresh the page."
      :error-detail="errorDetail"
    />
    <div class="flex w-fit flex-col justify-center text-center">
      <p class="mr-2">
        I want to borrow
      </p>
      <CurrencyInput
        id="loan-amount"
        label="Loan amount"
        :model-value="modelValue"
        :error-message="loanAmountInvalidMessage"
        @update:model-value="updateLoanAmount"
      />
    </div>
    <div class="text-center leading-10 text-neutral-primary">
      I'd like a loan for
      <SelectDropdown
        id="loan-purpose"
        label="Loan purpose"
        :model-value="selectedLoanPurpose"
        :options="loanPurposes"
        placeholder="Loan purpose"
        @update:model-value="updateSelectedLoanPurpose"
      />
      to be repaid
      <SelectDropdown
        id="repayment-period"
        label="Repayment period"
        :model-value="selectedRepaymentPeriod"
        :options="requestedRepaymentPeriods"
        placeholder="Repayment period"
        @update:model-value="updateSelectedRepaymentPeriod"
      />
      over the course of
      <SelectDropdown
        id="repayment-term"
        label="Term"
        :model-value="selectedTermMonth"
        :options="requestedTermMonths"
        placeholder="Repayment term"
        @update:model-value="updateSelectedTermMonth"
      />
    </div>
  </div>
  <RepaymentAmount
    v-if="outputPerPeriod && selectedTermMonth"
    :repayment-amount="outputPerPeriod"
    :total-repayment-periods="totalRepaymentPeriods"
    :repayment-term-label="selectedTermMonth.label ?? ''"
    :repayment-period-label="selectedRepaymentPeriod.label ?? ''"
  />
</template>
