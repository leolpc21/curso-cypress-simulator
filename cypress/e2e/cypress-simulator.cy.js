describe('Cypress Simulator', () => {

  beforeEach(function () {
    cy.visit('./src/index.html?skipCaptcha=true', {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    });
    cy.login();
  });

  it('successfully simulates a Cypress command (e.g., cy.log("Yay!"))', () => {
    cy.submeterCodigo("cy.log('Yay!')", "Success:", "cy.log('Yay!') // Logged message 'Yay!'");
  })

  it('shows an error when entering and running an invalid Cypress command (e.g., cy.run())', () => {
    cy.submeterCodigo('cy.run()', 'Error:', 'Invalid Cypress command: cy.run()');
  })

  it('shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains("Login"))', () => {
    cy.submeterCodigo('cy.contains("Login")', 'Warning:', 'The `cy.contains` command has not been implemented yet.');
  })

  it('shows an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)', () => {
    cy.submeterCodigo('cy.visit', 'Error:', 'Missing parentheses on `cy.visit` command');
  })

  it('asks for help and gets common Cypress commands and examples with a link to the docs', () => {
    cy.submeterCodigo('help', 'Common Cypress commands and examples:', 'For more commands and details, visit the official Cypress API documentation.');

    cy.contains('#outputArea a', 'official Cypress API documentation')
      .should('have.attr', 'href', 'https://docs.cypress.io/api/table-of-contents')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('be.visible');
  })

  it.skip('maximize/minimize', () => {

  })

  it.skip('logout', () => {

  })

  it.skip('show and hide logout button', () => {

  })

  it.skip('running... state', () => {

  })

  it.skip('accept cookies', () => {

  })

  it.skip('decline cookies', () => {

  })

  it.skip('captcha button state', () => {

  })

  it.skip('captcha error', () => {

  })

  it.skip('run button - enable/disable states', () => {

  })

  it.skip('reset textarea on logout and login', () => {

  })

  it.skip('disabled run button on logout and login', () => {

  })

  it.skip('reset output on logout and login', () => {

  })

  it.skip('no cooking banner on the login page', () => {

  })
})