import { describe, it, beforeAll, afterEach, expect, vi } from 'vitest'
import {
  getLoanPurposesAsync,
  getRequestedRepaymentPeriodsAsync,
  getRequestedTermMonthsAsync,
} from '@/services/service.js'

describe('service.js API calls', () => {
  beforeAll(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getLoanPurposesAsync', () => {
    it('returns data on success', async () => {
      const mockData = [
        { label: 'Test', value: 'test', annualRate: 0.1 },
      ]
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })
      const result = await getLoanPurposesAsync()
      expect(result).toEqual(mockData)
    })

    it('throws error when promise is rejected', async () => {
      await expect(getLoanPurposesAsync()).rejects.toThrow('Failed to fetch loan purposes')
    })
  })

  describe('getRequestedRepaymentPeriodsAsync', () => {
    it('returns data on success', async () => {
      const mockData = [
        { label: 'Weekly', value: 52 },
      ]
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })
      const result = await getRequestedRepaymentPeriodsAsync()
      expect(result).toEqual(mockData)
    })

    it('throws error when promise is rejected', async () => {
      await expect(getRequestedRepaymentPeriodsAsync()).rejects.toThrow('Failed to fetch requested repayment periods')
    })
  })

  describe('getRequestedTermMonthsAsync', () => {
    it('returns data on success', async () => {
      const mockData = [
        { label: '6 months', value: 6 },
      ]
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })
      const result = await getRequestedTermMonthsAsync()
      expect(result).toEqual(mockData)
    })

    it('throws error when promise is rejected', async () => {
      await expect(getRequestedTermMonthsAsync()).rejects.toThrow('Failed to fetch requested term months')
    })
  })
})
