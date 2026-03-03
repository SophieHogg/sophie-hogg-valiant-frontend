import { navigateAndValidate } from '../helpers/navigateAndValidate'
import { fillForm } from '../helpers/fillForm'
import { checkOutputCards } from '../helpers/checkOutputCards'

describe('Repayment Calculator', () => {
  it('runs the app and renders header', () => {
    navigateAndValidate()
  })

  it('fills out the form', () => {
    navigateAndValidate()
    fillForm()
  })

  it('renders cards with expected amounts', () => {
    navigateAndValidate()
    fillForm()
    checkOutputCards('461.00', '11,064.00')
  })

  it('re-renders cards after value has changed', () => {
    navigateAndValidate()
    fillForm()
    checkOutputCards('461.00', '11,064.00')
    cy.get('#loan-amount').clear()
    // sometimes in my experience clear can be a bit flaky.
    // make sure the input is actually empty
    cy.get('#loan-amount').should('be.empty')
    cy.get('#loan-amount').type(20000)
    checkOutputCards('923.00', '22,152.00')
  })

  it('renders expected tooltips', () => {
    navigateAndValidate()
    fillForm()
    checkOutputCards('461.00', '11,064.00')
    cy.get('#repayment-amount-by-period').trigger('mouseenter')
    cy.get('.tippy-box').should('be.visible')
    cy.get('.tippy-box').should('contain', '$461.45')
    cy.get('.tippy-box').should('not.contain', '$11,074.78')

    cy.get('#repayment-amount-by-period').trigger('mouseleave')
    cy.get('.tippy-box').should('not.exist')

    cy.get('#total-repayment-amount').trigger('mouseenter')
    cy.get('.tippy-box').should('be.visible')
    cy.get('.tippy-box').should('contain', '$461.45 * 24 = $11,074.78')
  })
})
