/// <reference types="cypress" />
/// <reference types="../../support" />

context('User Card as Owner', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('should have edit button', () => {
    cy.testId('card-edit').should('exist');
  });

  // it('click edit button', () => {
  //   cy.testId('card-edit').click();
  // });
});
