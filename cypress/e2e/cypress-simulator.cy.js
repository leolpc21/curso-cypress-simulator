describe('Cypress Simulator', () => {
  beforeEach(function () {
    cy.visit('./src/index.html?skipCaptcha=true', {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted");
      }
    });
    cy.login();
  });

  it('successfully simulates a Cypress command (e.g., cy.log("Yay!"))', () => {
    cy.submeterCodigo("cy.log('Yay!')", "Success:", "cy.log('Yay!') // Logged message 'Yay!'");
  });

  it('shows an error when entering and running an invalid Cypress command (e.g., cy.run())', () => {
    cy.submeterCodigo('cy.run()', 'Error:', 'Invalid Cypress command: cy.run()');
  });

  it('shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains("Login"))', () => {
    cy.submeterCodigo('cy.contains("Login")', 'Warning:', 'The `cy.contains` command has not been implemented yet.');
  });

  it('shows an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)', () => {
    cy.submeterCodigo('cy.visit', 'Error:', 'Missing parentheses on `cy.visit` command');
  });

  it('asks for help and gets common Cypress commands and examples with a link to the docs', () => {
    cy.submeterCodigo('help', 'Common Cypress commands and examples:', 'For more commands and details, visit the official Cypress API documentation.');

    cy.contains('#outputArea a', 'official Cypress API documentation')
      .should('have.attr', 'href', 'https://docs.cypress.io/api/table-of-contents')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('be.visible');
  });

  it('maximizes and minimizes a simulation result', () => {
    cy.submeterCodigo("cy.log('Yay!')", 'Success:', "cy.log('Yay!') // Logged message 'Yay!'");

    cy.get('.expand-collapse')
      .should('have.attr', 'aria-expanded', 'false')
      .click();

    cy.contains('#outputArea', 'Success:', { timeout: 6000 })
      .should('contain', "cy.log('Yay!') // Logged message 'Yay!'")
      .and('be.visible');

    cy.get('#collapseIcon').should('be.visible');

    cy.get('.expand-collapse')
      .should('have.attr', 'aria-expanded', 'true')
      .click();

    cy.get('#expandIcon').should('be.visible');
  });

  it('logout successfully', () => {
    cy.logout();

    cy.get("#login").should("be.visible");
    cy.get("#sandwich-menu").should("not.be.visible");
  });

  it('shows and hides the logout button', () => {
    cy.get("#sandwich-menu").click();
    cy.contains("#logoutButton", "Logout").should("be.visible");

    cy.get("#sandwich-menu").click();
    cy.contains("#logoutButton", "Logout").should("not.be.visible");
  });

  it('shows the running state before showing the final result', () => {
    cy.get('#codeInput').type('cy.run()');
    cy.get('#runButton').click();

    cy.contains('#runButton', 'Running...')
      .should('be.visible')
      .and('be.disabled');
    cy.contains('#outputArea', 'Running... Please wait.').should('be.visible');
    cy.contains('#runButton', 'Running...', { timeout: 6000 }).should('not.exist');
    cy.contains('#runButton', 'Run')
      .should('be.visible')
      .and('not.be.disabled');
    cy.contains('#outputArea', 'Error:')
      .should('contain', 'Invalid Cypress command: cy.run()')
      .and('be.visible');
  });

  it('checks the run button disabled and enabled states', () => {
    cy.get('#runButton').should('be.disabled');
    cy.get('#codeInput').type('cy.run()');
    cy.get('#runButton').should('be.enabled');
    cy.get('#codeInput').clear();
    cy.get('#runButton').should('be.disabled');  
  });

  it('clears the code input when logging off then logging in agai', () => {
    cy.get('#codeInput').type('cy.run()');
    cy.logout();
    cy.login();

    cy.get('#codeInput').should('be.empty');
  });

  it('disables the run button when logging off then logging in again', () => {
    cy.get('#codeInput').type('cy.run()');
    cy.logout();
    cy.login();

    cy.get('#runButton').should('be.disabled');
  });

  it('clears the code output when logging off then logging in again', () => {
    cy.submeterCodigo('cy.run()', 'Error:', 'Invalid Cypress command: cy.run()');
    cy.logout();
    cy.login();

    cy.get('#outputArea').should('be.empty');
  });

  it("doesn't show the cookie consent banner on the login page", () => {
    cy.clearAllLocalStorage();
    cy.reload();
    cy.contains('button', 'Login').should('be.visible');

    cy.get('#cookieConsent').should('not.be.visible');
  });
});

describe('Cypress Simulator - Cookies consent', function () {
  beforeEach(function () {
    cy.visit('./src/index.html?skipCaptcha=true');
    cy.login();
  });

  it('consents on the cookies usage', () => {
    cy.contains('#acceptCookies', 'Accept').click();

    cy.get('#cookieConsent').should('not.be.visible');
    cy.window()
      .its('localStorage.cookieConsent')
      .should('eq', 'accepted');
    // ou
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cookieConsent')).to.eq('accepted');
    });
    //ou
    cy.getLocalStorage('cookieConsent').should('eq', 'accepted');
  });

  it('declines on the cookies usage', () => {
    cy.contains('#declineCookies', 'Decline').click();

    cy.get('#cookieConsent').should('not.be.visible');
    cy.window()
      .its('localStorage.cookieConsent')
      .should('eq', 'declined');
    // ou
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cookieConsent')).to.eq('declined');
    });
    //ou
    cy.getLocalStorage('cookieConsent').should('eq', 'declined');
  });

  it("consents on the cookies usage and doesn't show the cookie consent banner on the login page", () => {
    cy.contains('#acceptCookies', 'Accept').click();
    cy.logout();
    cy.login();

    cy.get('#cookieConsent').should('not.be.visible');
  });

  it("declines on the cookies usage and doesn't show the cookie consent banner on the login page", () => {
    cy.contains('#declineCookies', 'Decline').click();
    cy.logout();
    cy.login();

    cy.get('#cookieConsent').should('not.be.visible');
  });
});

describe('Cypress Simulator - Captcha', function () {
  beforeEach(function () {
    cy.visit('./src/index.html');
    cy.login();
  });

  it("disables the captcha verify button when no answer is provided or it's cleared", () => {
    cy.get('#verifyCaptcha').should('be.disabled');
    cy.get('#captchaInput').type('1234');
    cy.get('#verifyCaptcha').should('be.enabled');
    cy.get('#captchaInput').clear();
    cy.get('#verifyCaptcha').should('be.disabled');
  });

  it('shows an error on a wrong captcha answer and goes back to its initial state', () => {
    cy.get('#captchaInput').type('1234');
    cy.get('#verifyCaptcha').click();

    cy.get('#captchaInput').should('have.value', '');
    cy.get('#verifyCaptcha').should('be.disabled');
    cy.contains('#captchaError', 'Incorrect answer, please try again.').should('be.visible');
  });
});