Cypress.Commands.add('submeterCodigo', (code, title, message) => {
  cy.get('#codeInput').type(code);
  cy.get('#runButton').click();

  cy.contains('#outputArea', title, { timeout: 6000 })
    .should('contain', message)
    .and('be.visible');
});

Cypress.Commands.add('logout', () => {
  cy.get('#sandwich-menu').click();
  cy.contains('#logoutButton', 'Logout').click();
});

Cypress.Commands.add('login', () => {
  const setup = () => {
    cy.visit('./src/index.html?skipCaptcha=true');
    cy.contains('button', 'Login').click();
  };

  const validate = () => {
    cy.visit('./src/index.html');
    cy.contains('button', 'Login', { timeout: 1000 })
      .should('not.be.visible');
  };

  const options = {
    cacheAcrossSpecs: true,
    validate
  };

  cy.session(
    'sessionId',
    setup,
    options
  );
});