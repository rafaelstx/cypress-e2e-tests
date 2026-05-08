Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.get('input[type="email"]').type(email); 
  cy.get('input[type="password"]').type(password);
  cy.contains('button', 'Entrar').click();
  
  // Lida com o bug do modal automaticamente
  cy.contains('button', 'Continuar').click();
});