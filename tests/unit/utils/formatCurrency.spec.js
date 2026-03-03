import formatCurrency from '@/utils/formatCurrency'

describe('formatCurrency', () => {
  it('formats AUD currency by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats negative numbers', () => {
    expect(formatCurrency(-100)).toBe('-$100.00')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('handles large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })
})
