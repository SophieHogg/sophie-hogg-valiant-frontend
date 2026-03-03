import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../../src/App.vue'
import { getLoanPurposesAsync, getRequestedRepaymentPeriodsAsync, getRequestedTermMonthsAsync } from '../../src/services/service'
import { mockLoanPurposes, mockRepaymentPeriods, mockTerms } from './mocks/backend-mocks'

vi.mock('../../src/services/service', () => ({
  getLoanPurposesAsync: vi.fn(),
  getRequestedRepaymentPeriodsAsync: vi.fn(),
  getRequestedTermMonthsAsync: vi.fn(),
}))

describe('App.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getLoanPurposesAsync.mockResolvedValue(mockLoanPurposes)
    getRequestedRepaymentPeriodsAsync.mockResolvedValue(mockRepaymentPeriods)
    getRequestedTermMonthsAsync.mockResolvedValue(mockTerms)
  })

  it('loads loan purposes, repayment periods, and term months from backend', async () => {
    const wrapper = mount(App)
    await flushPromises()
    expect(wrapper.vm.loanPurposes.length).toBe(mockLoanPurposes.length)
    expect(wrapper.vm.requestedRepaymentPeriods.length).toBe(mockRepaymentPeriods.length)
    expect(wrapper.vm.requestedTermMonths.length).toBe(mockTerms.length)
  })

  it('shows error if loan amount is empty after dirty', async () => {
    const wrapper = mount(App)
    await flushPromises()
    wrapper.vm.updateLoanAmount(undefined)
    expect(wrapper.vm.loanAmountInvalidMessage).toBe('Loan amount is required')
  })

  it('shows error if loan amount is below minimum', async () => {
    const wrapper = mount(App)
    await flushPromises()
    wrapper.vm.updateLoanAmount(999)
    expect(wrapper.vm.loanAmountInvalidMessage).toBe('Minimum amount: $1,000.00')
  })

  it('shows error if loan amount is above maximum', async () => {
    const wrapper = mount(App)
    await flushPromises()
    wrapper.vm.updateLoanAmount(20000001)
    expect(wrapper.vm.loanAmountInvalidMessage).toBe('Maximum amount: $20,000,000.00')
  })

  it('calculates repayment when all fields are valid', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TooltipPopup: {
            template: '<div id="repayment-amount-by-period"></div>',
          },
        },
      },
    })
    await flushPromises()
    const loanPurpose = { label: 'Day-to-day capital', value: 'general', annualRate: 0.12 }
    const repaymentPeriod = { label: 'Monthly', value: 12 }
    const termMonth = { label: '12 months', value: 12 }
    wrapper.vm.updateSelectedLoanPurpose(loanPurpose)
    wrapper.vm.updateSelectedRepaymentPeriod(repaymentPeriod)
    wrapper.vm.updateSelectedTermMonth(termMonth)
    wrapper.vm.updateLoanAmount(10000)
    expect(Math.round(wrapper.vm.outputPerPeriod)).toBe(-888)
  })

  it('recalculates repayment when all fields are valid and one field is changed', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          TooltipPopup: {
            template: '<div id="repayment-amount-by-period"></div>',
          },
        },
      },
    })
    await flushPromises()
    const loanPurpose = { label: 'Day-to-day capital', value: 'general', annualRate: 0.12 }
    const repaymentPeriod = { label: 'Monthly', value: 12 }
    const termMonth = { label: '12 months', value: 12 }
    wrapper.vm.updateSelectedLoanPurpose(loanPurpose)
    wrapper.vm.updateSelectedRepaymentPeriod(repaymentPeriod)
    wrapper.vm.updateSelectedTermMonth(termMonth)
    wrapper.vm.updateLoanAmount(10000)
    expect(Math.round(wrapper.vm.outputPerPeriod)).toBe(-888)
    wrapper.vm.updateLoanAmount(20000)
    expect(Math.round(wrapper.vm.outputPerPeriod)).toBe(-1777)
  })
})
