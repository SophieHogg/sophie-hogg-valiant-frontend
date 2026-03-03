export const fillForm = (
  loanAmount = '10000',
  loanPurpose = 'day-to-day capital',
  repaymentPeriod = 'monthly',
  repaymentTerm = '2 years'
) => {
  cy.get('#loan-amount').type(loanAmount)
  cy.get('#loan-purpose').select(loanPurpose)
  cy.get('#repayment-period').select(repaymentPeriod)
  cy.get('#repayment-term').select(repaymentTerm)
}
