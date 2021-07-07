/// <reference types="cypress" />
/// <reference types="../../support" />

context('Overview', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');
  });

  it('should have page title', () => {
    cy.title().should('eq', 'cypress-test | Gamer One');
  });

  it('should have user card and menu', () => {
    cy.testId('card-user').should('exist');
    cy.testId('profile-nav').should('exist');
  });
});
