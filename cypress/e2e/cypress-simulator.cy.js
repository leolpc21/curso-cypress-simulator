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
    cy.submeterCodigo("cy.log('Yay!')", "Success:\n\ncy.log('Yay!') // Logged message 'Yay!'");
  })

  it('shows an error when entering and running an invalid Cypress command (e.g., cy.run())', () => {
    cy.submeterCodigo('cy.run()', 'Error:\n\nInvalid Cypress command: cy.run()');
  })

  it('it shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains("Login"))', () => {
    cy.submeterCodigo('cy.contains("Login")', 'Warning:\n\nThe `cy.contains` command has not been implemented yet.');
  })

  it('it shows an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)', () => {
    cy.submeterCodigo('cy.visit', 'Error:\n\nMissing parentheses on `cy.visit` command');
  })

  it.skip('help', () => {

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