import { mount } from '@vue/test-utils'
import RepaymentAmount from '@/components/organisms/RepaymentAmount.vue'
import formatCurrency from '@/utils/formatCurrency'
import { vi } from 'vitest'

vi.mock('tippy.js', () => ({
  default: vi.fn(() => ({ destroy: vi.fn() })),
}))

describe('RepaymentAmount.vue', () => {
  const defaultProps = {
    repaymentAmount: 1234.56,
    repaymentTermLabel: '12 months',
    repaymentPeriodLabel: 'Weekly',
    errorMessage: '',
    totalRepaymentPeriods: 52,
  }

  it('renders repayment amount and total repayment amount', () => {
    const wrapper = mount(RepaymentAmount, {
      global: {
        stubs: {
          TooltipPopup: {
            template: '<div id="repayment-amount-by-period"><slot></slot></div>',
          },
        },
      },
      props: defaultProps,
    })
    // Rounded repayment amount
    const rounded = Math.round(defaultProps.repaymentAmount)
    expect(wrapper.find('#repayment-amount-by-period').text()).toContain(
      formatCurrency(-rounded, 'AUD')
    )
    expect(wrapper.find('#total-repayment-amount').text()).toContain(
      formatCurrency(-rounded * defaultProps.totalRepaymentPeriods, 'AUD')
    )
  })

  it('shows correct tooltip content for repayment amount', async () => {
    const wrapper = mount(RepaymentAmount, {
      props: defaultProps,
    })
    // Tooltip content calculation
    const expectedTooltip = formatCurrency(Math.round(-defaultProps.repaymentAmount * 100) / 100)
    const tooltip = wrapper.findComponent({ name: 'TooltipPopup' })
    expect(tooltip.props('content')).toBe(expectedTooltip)
  })

  it('shows correct tooltip content for total repayment amount', async () => {
    const wrapper = mount(RepaymentAmount, {
      props: defaultProps,
    })
    const expectedPeriod = formatCurrency(Math.round(-defaultProps.repaymentAmount * 100) / 100)
    const expectedTotal = formatCurrency((Math.round(-defaultProps.repaymentAmount * defaultProps.totalRepaymentPeriods * 100) / 100))
    const expectedTooltip = `Rounded from ${expectedPeriod} * ${defaultProps.totalRepaymentPeriods} = ${expectedTotal}`
    const tooltips = wrapper.findAllComponents({ name: 'TooltipPopup' })
    expect(tooltips[1].props('content')).toBe(expectedTooltip)
  })

  it('updates when props change', async () => {
    const wrapper = mount(RepaymentAmount, {
      global: {
        stubs: { TooltipContent: true },
      },
      props: defaultProps,
    })
    await wrapper.setProps({ repaymentAmount: -2000 })
    expect(wrapper.text()).toContain(formatCurrency(2000, 'AUD'))
    expect(wrapper.text()).toContain(formatCurrency(2000 * defaultProps.totalRepaymentPeriods, 'AUD'))
  })
})
