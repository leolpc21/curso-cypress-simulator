Cypress.Commands.add('login', () => {
  cy.contains('button', 'Login').click();
});

Cypress.Commands.add('submeterCodigo', (code, title, message) => {
  cy.get('#codeInput').type(code);
  cy.get('#runButton').click();
  
  cy.contains('#outputArea', title, { timeout: 6000 })
    .should('contain', message)
    .and('be.visible');
});