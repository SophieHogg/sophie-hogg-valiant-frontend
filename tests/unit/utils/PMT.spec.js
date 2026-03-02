import PMT from '@/utils/PMT'

describe('PMT', () => {
  test.each([
    [6, -5146], [12, -2637], [24, -1384], [36, -968], [60, -637], [120, -396],
  ])('returns the expected result for different repayment time', (repaymentTime, expected) => {
    const result = PMT(0.1 / 12, repaymentTime, 30000)
    expect(Math.trunc(result)).toEqual(expected)
  })

  test.each([
    [10000, -461], [20000, -922], [100000, -4614],
  ])('returns the expected result for different loan amounts', (loanAmount, expected) => {
    const result = PMT(0.1 / 12, 24, loanAmount)
    expect(Math.trunc(result)).toEqual(expected)
  })

  test.each([
    [0.1, -461], [0.045, -436], [0.029, -429],
  ])('returns the expected result for annual rates', (annualRate, expected) => {
    const result = PMT(annualRate / 12, 24, 10000)
    expect(Math.trunc(result)).toEqual(expected)
  })

  test.each([
    [12, -461], [24, -438], [52, -426],
  ])('returns the expected result for repayment frequency', (repaymentFrequency, expected) => {
    const result = PMT(0.1 / repaymentFrequency, 24, 10000)
    expect(Math.trunc(result)).toEqual(expected)
  })
})
