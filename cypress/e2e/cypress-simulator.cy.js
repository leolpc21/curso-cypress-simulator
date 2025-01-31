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

  it('warning', () => {

  })

  it('error: valid command without parentheses', () => {

  })

  it('help', () => {

  })

  it('maximize/minimize', () => {

  })

  it('logout', () => {

  })

  it('show and hide logout button', () => {

  })

  it('running... state', () => {

  })

  it('accept cookies', () => {

  })

  it('decline cookies', () => {

  })

  it('captcha button state', () => {

  })

  it('captcha error', () => {

  })

  it('run button - enable/disable states', () => {

  })

  it('reset textarea on logout and login', () => {

  })

  it('disabled run button on logout and login', () => {

  })

  it('reset output on logout and login', () => {

  })

  it('no cooking banner on the login page', () => {

  })
})