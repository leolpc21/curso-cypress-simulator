
declare namespace Cypress {
  interface Chainable {
    /**
     * Submete um código para execução e verifica o resultado.
     * @param {string} code O código a ser executado.
     * @param {string} message A mensagem esperada na área de saída.
     * @example cy.submeterCodigo('cy.visit("https://example.com")', 'Visiting https://example.com');
     */
    submeterCodigo(code: string, message: string): Chainable<null>

    /**
     * Visita a página e faz o login.
     * @example cy.login()
     */
    login(): Chainable<null>
  }
}