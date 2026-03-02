import { describe, it } from 'vitest'
import {
    getLoanPurposesAsync,
    getRequestedRepaymentPeriodsAsync,
    getRequestedTermMonthsAsync
} from './service.js'

describe('service.js API calls', () => {
    beforeAll(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    describe('getLoanPurposesAsync', () => {
        it('returns data on success', async () => {
            const mockData = [
                { label: 'Test', value: 'test', annualRate: 0.1 }
            ]
            fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })
            const result = await getLoanPurposesAsync()
            expect(result).toEqual(mockData)
        })

        it('returns [] on error', async () => {
            fetch.mockRejectedValueOnce(new Error('fail'))
            const result = await getLoanPurposesAsync()
            expect(result).toEqual([])
        })
    })

    describe('getRequestedRepaymentPeriodsAsync', () => {
        it('returns data on success', async () => {
            const mockData = [
                { label: 'Weekly', value: 52 }
            ]
            fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })
            const result = await getRequestedRepaymentPeriodsAsync()
            expect(result).toEqual(mockData)
        })

        it('returns [] on error', async () => {
            fetch.mockRejectedValueOnce(new Error('fail'))
            const result = await getRequestedRepaymentPeriodsAsync()
            expect(result).toEqual([])
        })
    })

    describe('getRequestedTermMonthsAsync', () => {
        it('eturns data on success', async () => {
            const mockData = [
                { label: '6 months', value: 6 }
            ]
            fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })
            const result = await getRequestedTermMonthsAsync()
            expect(result).toEqual(mockData)
        })

        it('returns [] on error', async () => {
            fetch.mockRejectedValueOnce(new Error('fail'))
            const result = await getRequestedTermMonthsAsync()
            expect(result).toEqual([])
        })
    })

})
