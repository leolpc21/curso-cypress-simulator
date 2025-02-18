Cypress.Commands.add('login', () => {
  cy.contains('button', 'Login').click()
});

Cypress.Commands.add('submeterCodigo', (code, message) => {
  cy.get('#codeInput').type(code);
  cy.get('#runButton').click();
  
  cy.get('#outputArea', { timeout: 6000 })
    .should('have.text', message)
    .and('be.visible');
});