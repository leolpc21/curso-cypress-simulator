
declare namespace Cypress {
  interface Chainable {
    /**
     * Submete um código para execução e verifica o resultado.
     * @param {string} code O código a ser executado.
     * @param {string} title O título esperado na área de saída.
     * @param {string} message A mensagem esperada na área de saída.
     * @example cy.submeterCodigo("cy.log('Yay!')", 'Success:', "cy.log('Yay!') // Logged message 'Yay!'");
     */
    submeterCodigo(code: string, title: string, message: string): Chainable<null>

    /**
     * Visita a página e faz o login.
     * @example cy.login()
     */
    login(): Chainable<null>

    /**
     * Faz o logout.
     * @example cy.logout()
     */
    logout(): Chainable<null>
  }
}