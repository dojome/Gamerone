/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Settings - Gear', () => {
  const successTitle = 'Success';
  const successMessage = 'Successfully updated your profile layout settings';

  beforeEach(() => {
    cy.login();
    cy.visit('/settings/gear');

    // aliases
    cy.testId('form').within(() => {
      cy.testId('add').as('add');
    });
  });

  it('should have page title', () => {
    cy.title().should('eq', 'Gear | Gamer One');
  });

  it('has save button', () => {
    cy.get('@add').should('have.text', 'Add');
  });
});
