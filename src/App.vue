<script setup>
import { ref, onMounted } from 'vue'
import CurrencyInput from './components/CurrencyInput.vue'
import SelectDropdown from './components/SelectDropdown.vue'
import { getLoanPurposesAsync, getRequestedRepaymentPeriodsAsync, getRequestedTermMonthsAsync } from './services/service'
import PMT from './utils/PMT'

defineOptions({
  name: 'App',
})

const loanPurposes = ref([])
const requestedRepaymentPeriods = ref([])
const requestedTermMonths = ref([])

const modelValue = ref('')
const selectedLoanPurpose = ref(null)
const selectedRepaymentPeriod = ref(null)
const selectedTermMonth = ref(null)
const loading = ref(true)
onMounted(async () => {
  try {
    loading.value = true
    loanPurposes.value = await getLoanPurposesAsync()
    requestedRepaymentPeriods.value = await getRequestedRepaymentPeriodsAsync()
    requestedTermMonths.value = await getRequestedTermMonthsAsync()
  } finally {
    loading.value = false
  }
})

const outputPerPeriod = ref()
const repaymentPerPeriod = ref()

const handleSubmit = () => {
  // TODO: Validation and error states
  repaymentPerPeriod.value = selectedLoanPurpose.value.annualRate / selectedRepaymentPeriod.value.value
  const unroundedOutput = PMT(repaymentPerPeriod.value, selectedTermMonth.value.value, modelValue.value)
  outputPerPeriod.value = Math.round(unroundedOutput)
}

</script>

<template lang="html">
  <div v-if="loading">
    Loading...
  </div>
  <div v-else>
    <CurrencyInput
      :model-value="modelValue"
      @update:model-value="(value) => modelValue = value"
    />
    <SelectDropdown
      v-model="selectedLoanPurpose"
      :options="loanPurposes"
      placeholder="Select loan purpose"
    />
    <SelectDropdown
      v-model="selectedRepaymentPeriod"
      :options="requestedRepaymentPeriods"
      placeholder="Select repayment period"
    />
    <SelectDropdown
      v-model="selectedTermMonth"
      :options="requestedTermMonths"
      placeholder="Select term"
    />
    <button
      @click="handleSubmit"
    >
      Submit
    </button>
    <p v-if="outputPerPeriod !== undefined">
      Repayment per period: ${{ -outputPerPeriod }}
    </p>
    <p v-if="outputPerPeriod !== undefined && selectedTermMonth.value !== null"> Repayment total: ${{ -outputPerPeriod * selectedTermMonth.value }}</p>
  </div>
</template>
