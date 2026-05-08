describe('Funcionalidade de Login e Autenticação', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('/');
  });

  context('Validações de Campos e Layout', () => {

    it('Deve exibir mensagens de validação ao enviar formulário em branco', () => {
      cy.contains('button', 'Entrar').click();

      cy.get('field[name="email"]')
        .contains('Usuário ou senha inválidos')
        .should('be.visible');

      cy.get('field[name="password"]')
        .contains('Usuário ou senha inválidos')
        .should('be.visible');
    });

    it('Evidência de Bug: Link "Esqueceu sua senha?" não possui ação vinculada', () => {
      cy.url().then((urlInicial) => {
        cy.contains('Esqueceu sua senha?').click();
        cy.url().should('eq', urlInicial);
      });
    });

  });

  context('Autenticação e Acesso', () => {

    it('Evidência de Bug: Login válido exibe alerta de erro, mas permite acesso ao sistema', () => {
      cy.get('input[type="email"]').type('qa@test.com');
      cy.get('input[type="password"]').type('123456');
      cy.contains('button', 'Entrar').click();
      cy.contains('Seu login está incorreto, quer continuar?').should('be.visible');
      cy.screenshot('bug-modal-login-falso-negativo');
      cy.contains('button', 'Continuar').click();
      cy.get('header button svg').should('be.visible');
      cy.get('a[routerlink="/dashboard/campanha"]').should('be.visible').click();
    });

  });
});