export const checkOutputCards = (
  repaymentByPeriodValue,
  totalRepaymentValue
) => {
  // splitting these checks into exist and contain ensures
  // we're not failing validation when the card hasn't loaded
  cy.get('#repayment-amount-by-period').should('exist')
  cy.get('#repayment-amount-by-period').should('contain', repaymentByPeriodValue)

  cy.get('#total-repayment-amount').should('exist')
  cy.get('#total-repayment-amount').should('contain', totalRepaymentValue)
}
