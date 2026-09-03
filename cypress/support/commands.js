Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('[name="firstName"]').type('Bia')
  cy.get('[name="lastName"]').type('Rodrigues')
  cy.get('input[type="email"]').type('biasc@gmail.com')
  cy.get('[name="open-text-area"]').type('Campo ok!')
  cy.get('button[type="submit"]').click()  
})