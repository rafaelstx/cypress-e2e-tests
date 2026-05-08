describe('Funcionalidades do Menu Campanha', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.login('qa@test.com', '123456');

    cy.get('a[routerlink="/dashboard/campanha"]').should('be.visible').click();
    cy.contains('Bancos de dados').click();
    cy.url().should('include', '/bancos-de-dados');
  });

  context('Módulo: Bancos de dados - Ações de Sucesso', () => {

    it('Deve criar um novo banco de dados com sucesso', () => {
      const nomeBanco = 'Banco de Teste Cypress';

      cy.contains('button', 'Criar').click();
      cy.contains('Adicionar novo item').should('be.visible');
      cy.get('input').last().type(nomeBanco);
      cy.contains('button', 'Salvar').click();

      cy.contains(nomeBanco).should('be.visible');
    });

    it('Deve filtrar itens na barra de pesquisa em tempo real e limpar busca', () => {
      cy.contains('button', 'Criar').click();
      cy.get('input').last().type('aaaaaaa');
      cy.contains('button', 'Salvar').click();

      cy.contains('button', 'Criar').click();
      cy.get('input').last().type('bbbbbbbbb');
      cy.contains('button', 'Salvar').click();

      cy.get('input[placeholder="Pesquisar"]').type('a');

      cy.contains('aaaaaaa').should('be.visible');
      cy.contains('bbbbbbbbb').should('not.exist');

      cy.get('input[placeholder="Pesquisar"]').clear();

      cy.contains('bbbbbbbbb').should('be.visible');
    });

    it('Deve excluir um banco de dados com sucesso', () => {
      const nomeExclusao = 'Banco para Excluir';

      cy.contains('button', 'Criar').click();
      cy.get('input').last().type(nomeExclusao);
      cy.contains('button', 'Salvar').click();

      cy.contains('tr', nomeExclusao).within(() => {
        cy.get('svg').first().click();
      });

      cy.contains(nomeExclusao).should('not.exist');
    });

    it('Deve apagar todos os itens ao clicar no botão Reset', () => {
      cy.contains('button', 'Criar').parent().find('svg').first().click();

      cy.contains('Nenhum banco de dados encontrado').should('be.visible');
    });

  });

  context('Módulo: Bancos de dados - Evidência de Bugs', () => {

    it('Evidência de Bug: Arquivamento de itens não exibe dados na tela de arquivados', () => {
      const nomeArquivo = 'Banco para Arquivar';

      cy.contains('button', 'Criar').click();
      cy.get('input').last().type(nomeArquivo);
      cy.contains('button', 'Salvar').click();

      cy.contains('tr', nomeArquivo).within(() => {
        cy.get('svg').last().click();
      });

      cy.contains(nomeArquivo).should('not.exist');

      cy.get('input[placeholder="Pesquisar"]')
        .parent()
        .parent()
        .find('svg')
        .first()
        .click();

      cy.contains('Itens Arquivados').should('be.visible');

      cy.contains(nomeArquivo).should('not.exist');

      cy.screenshot('bug-arquivamento-vazio');
    });

  });

  context('Módulo: Colmeia Forms', () => {

    it('Evidência de Bug: Tela renderiza em branco ao acessar Colmeia Forms', () => {
      cy.contains('Colmeia Forms').click();

      cy.url().should('include', '/colmeia-forms');
      cy.get('h1').should('not.exist');

      cy.screenshot('bug-colmeia-forms-em-branco');
    });

  });
});