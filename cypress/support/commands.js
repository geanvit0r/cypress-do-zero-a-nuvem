Cypress.Commands.add('fillMandatoryFieldAndSubmit', (data = {
    firstName: 'Howard',
    lastName: 'Wolowitz',
    email: 'howardwolowitz@gmail.com',
    text: 'text text text'
}) => {
    cy.get('input#firstName').type(data.firstName)
    cy.get('input#lastName').type(data.lastName)
    cy.get('input#email').type(data.email)
    cy.get('textarea#open-text-area').type(data.text)
    cy.contains('button','Enviar').click()
})