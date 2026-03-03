export const navigateAndValidate = () => {
  cy.visit('http://localhost:5173/')
  cy.url().should('eq', 'http://localhost:5173/')
  cy.get('#header').should('exist')
}
