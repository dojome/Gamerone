/// <reference types="cypress" />
/// <reference types="../../support" />

context('User Card - Modal', () => {
  const MODAL_NAME = 'user-settings-dialog';

  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');

    // aliases
    cy.testId('card-user').within(() => {
      cy.testId('card-edit').as('edit');
    });
  });

  it('should have edit button', () => {
    cy.get('@edit').should('exist');
  });

  it('should open edit modal', () => {
    cy.get('@edit').click();
    cy.testId(MODAL_NAME).should('exist');
  });

  it('should have three tabs', () => {
    cy.get('@edit').click();
    cy.get('[data-testid="tab-nav"] > li').as('tabNav');
    cy.get('@tabNav').should('have.length', 3);
  });

  it('should view cover', () => {
    cy.get('@edit').click();
    cy.get('[data-testid="tab-nav"] > li').as('tabNav');
    cy.get('@tabNav').children().eq(0).should('have.text', 'Profile Image');
    cy.get('@tabNav').children().eq(0).click();
  });

  it('should view cover', () => {
    cy.get('@edit').click();
    cy.get('[data-testid="tab-nav"] > li').as('tabNav');
    cy.get('@tabNav').children().eq(1).should('have.text', 'Header Image');
  });

  it('should edit profile', () => {
    cy.get('@edit').click();
    cy.get('[data-testid="tab-nav"] > li').as('tabNav');
    cy.get('@tabNav').children().eq(2).should('have.text', 'Profile');
  });
});
