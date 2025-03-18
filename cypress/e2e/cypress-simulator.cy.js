describe('Cypress Simulator', () => {
  beforeEach(function () {
    cy.visit('./src/index.html?skipCaptcha=true', {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted");
      }
    });
    cy.login();
  });

  it('shows an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)', () => {
    cy.submeterCodigo('cy.visit', 'Error:', 'Missing parentheses on `cy.visit` command');
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