/// <reference types="cypress" />
/// <reference types="../../support" />

context('Sponsors Card - Owner', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');
  });

  it('should have sponsors card', () => {
    cy.testId('card-sponsors').should('exist');
    // with edit button
    cy.testId('card-sponsors').within(() => {
      cy.testId('card-edit').should('exist');
    });
  });

  // it('click edit button', () => {
  //   cy.testId('card-edit').click();
  // });
});
