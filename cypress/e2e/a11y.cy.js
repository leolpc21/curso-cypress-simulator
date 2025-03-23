describe("Cypress Simulator - A11y Checks", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true&chancesOfError=0", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.injectAxe()
  })

  it('successfully simulates a Cypress command (e.g., cy.log("Yay!"))', () => {
    cy.submeterCodigo("cy.log('Yay!')", "Success:", "cy.log('Yay!') // Logged message 'Yay!'");

    cy.checkA11y('.success')
  });

  it('shows an error when entering and running an invalid Cypress command (e.g., cy.run())', () => {
    cy.submeterCodigo('cy.run()', 'Error:', 'Invalid Cypress command: cy.run()');

    cy.checkA11y('.error')
  });

  it('shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains("Login"))', () => {
    cy.submeterCodigo('cy.contains("Login")', 'Warning:', 'The `cy.contains` command has not been implemented yet.');

    cy.checkA11y('.warning')
  });

  it('asks for help and gets common Cypress commands and examples with a link to the docs', () => {
    cy.submeterCodigo('help', 'Common Cypress commands and examples:', 'For more commands and details, visit the official Cypress API documentation.');

    cy.contains('#outputArea a', 'official Cypress API documentation')
      .should('have.attr', 'href', 'https://docs.cypress.io/api/table-of-contents')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('be.visible');

    cy.checkA11y('#outputArea')
  });

  it('maximizes and minimizes a simulation result', () => {
    cy.submeterCodigo("cy.log('Yay!')", 'Success:', "cy.log('Yay!') // Logged message 'Yay!'");

    cy.get('.expand-collapse')
      .should('have.attr', 'aria-expanded', 'false')
      .click();

    cy.contains('#outputArea', 'Success:', { timeout: 6000 })
      .should('contain', "cy.log('Yay!') // Logged message 'Yay!'")
      .and('be.visible');

    cy.checkA11y()

    cy.get('#collapseIcon').should('be.visible');

    cy.get('.expand-collapse')
      .should('have.attr', 'aria-expanded', 'true')
      .click();

    cy.get('#expandIcon').should('be.visible');
  });

  it('logs out successfully', () => {
    cy.get("#sandwich-menu").click();

    cy.checkA11y()

    cy.contains("#logoutButton", "Logout").click();

    cy.get("#login").should("be.visible");
    cy.get("#sandwich-menu").should("not.be.visible");

    cy.checkA11y()
  });

  it('shows and hides the logout button', () => {
    cy.get("#sandwich-menu").click();
    cy.contains("#logoutButton", "Logout").should("be.visible");
    cy.checkA11y()

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

    cy.checkA11y()

    cy.contains('#runButton', 'Running...', { timeout: 6000 }).should('not.exist');
    cy.contains('#runButton', 'Run')
      .should('be.visible')
      .and('not.be.disabled');
    cy.contains('#outputArea', 'Error:')
      .should('contain', 'Invalid Cypress command: cy.run()')
      .and('be.visible');

    cy.checkA11y()
  });
});

describe('Cypress Simulator - Cookies consent', function () {
  beforeEach(function () {
    cy.login();
    cy.visit('./src/index.html?skipCaptcha=true');
    cy.injectAxe()
  });

  it('consents on the cookies usage', () => {
    cy.get('#cookieConsent')
      .as('cookieConsent')
      .should('be.visible');

    cy.checkA11y()

    cy.contains('#acceptCookies', 'Accept').click();

    cy.get('@cookieConsent').should('not.be.visible');
    cy.window()
      .its('localStorage.cookieConsent')
      .should('eq', 'accepted');
  });
});

describe('Cypress Simulator - Captcha', function () {
  beforeEach(function () {
    cy.visit('./src/index.html');
    cy.contains("button", "Login").click()
    cy.injectAxe()
  });

  it('finds no a11y issues on all captcha view states (button enabled/disabled and error)', () => {
    cy.get('#verifyCaptcha').should('be.disabled');
    cy.get('#captchaInput').type('1234');
    cy.get('#verifyCaptcha').should('be.enabled');
    cy.checkA11y()

    cy.get('#verifyCaptcha').click();

    cy.contains('#captchaError', 'Incorrect answer, please try again.').should('be.visible');
    cy.get('#captchaInput').should('have.value', '');
    cy.get('#verifyCaptcha').should('be.disabled');

    cy.checkA11y()
  });
});
