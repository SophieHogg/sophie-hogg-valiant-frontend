<script setup>
import { ref, onMounted } from 'vue'
import { getLoanPurposesAsync, getRequestedRepaymentPeriodsAsync, getRequestedTermMonthsAsync } from './services/service'
defineOptions({
  name: 'App',
})

const loanPurposes = ref([])
const requestedRepaymentPeriods = ref([])
const requestedTermMonths = ref([])
onMounted(async () => {
  loanPurposes.value = await getLoanPurposesAsync()
  requestedRepaymentPeriods.value = await getRequestedRepaymentPeriodsAsync()
  requestedTermMonths.value = await getRequestedTermMonthsAsync()
})
</script>

<template lang="html">
  <ul>
    <li
      v-for="item in loanPurposes"
      :key="item.value"
    >
      {{ item.label }} - {{ item.annualRate ?? '-' }}
    </li>
    <li
      v-for="item in requestedRepaymentPeriods"
      :key="item.value"
    >
      {{ item.label }} - {{ item.value }}
    </li>
    <li
      v-for="item in requestedTermMonths"
      :key="item.value"
    >
      {{ item.label }} - {{ item.value }}
    </li>
  </ul>
</template>
