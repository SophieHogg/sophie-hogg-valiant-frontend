// if this were a larger app, we might want to use something like axios
// and define the port more centrally.
// here, all the services are called in the same file as there are only 3

// separating this out makes it easier to change back to 5000 (or to a new port)
const port = 5001
const baseUrl = `http://localhost:${port}`

// Not using typescript here, so defining the type here
// {
//   label: string,
//   value: string,
//   annualRate: number,
// }
export const getLoanPurposesAsync = async () => {
  try {
    const res = await fetch(`${baseUrl}/loan-purposes`)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return res.json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch loan purposes', err)
    return []
  }
}

// {
//   label: string,
//   value: number,
// }
export const getRequestedRepaymentPeriodsAsync = async () => {
  try {
    const res = await fetch(`${baseUrl}/requested-repayment-periods`)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return res.json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch requested repayment periods', err)
    return []
  }
}

// {
//   label: string,
//   value: number,
// }
export const getRequestedTermMonthsAsync = async () => {
  try {
    const res = await fetch(`${baseUrl}/requested-term-months`)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return await res.json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch requested term months', err)
    return []
  }
}
