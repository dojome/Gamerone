/// <reference types="cypress" />

context('Password Reset', () => {
  beforeEach(() => {
    cy.visit('/account/password-reset');
  });

  it('should have field labels', () => {
    cy.testId('email-label').should('have.text', 'Email');
  });

  it('should have input and be empty on load', () => {
    cy.testId('email').should('exist');
    cy.testId('email').should('be.empty');
  });

  it('has reset button', () => {
    cy.testId('form').within(() => {
      cy.testId('reset').should('have.text', 'Reset');
    });
  });

  it('reset button disabled on load', () => {
    cy.testId('form').within(() => {
      cy.testId('reset').contains('Reset').should('be.disabled');
    });
  });

  it('email field validation', () => {
    // correct email format
    cy.testId('email').focus().type('cypress').blur();
    cy.testId('email-error').should('exist');
    cy.testId('email-error').should('have.text', 'Email format incorrect.');

    cy.testId('email').focus().type('cypress@gamerone').blur();
    cy.testId('email-error').should('exist');
    cy.testId('email-error').should('have.text', 'Email format incorrect.');
  });

  it('form should be valid but not find email', () => {
    cy.testId('email')
      .type('cypress-not-found@gamerone.gg')
      .should('have.value', 'cypress-not-found@gamerone.gg')
      .blur();

    cy.testId('form').within(() => {
      cy.testId('reset').should('be.enabled');
      cy.testId('reset').click();
    });

    cy.testId('form-error').should(
      'have.text',
      'If the email exists in Gamer One you will receive an email shortly.',
    );
  });

  it('form should be valid and send email', () => {
    cy.testId('email')
      .type('cypress@gamerone.gg')
      .should('have.value', 'cypress@gamerone.gg')
      .blur();

    cy.testId('form').within(() => {
      cy.testId('reset').should('be.enabled');
      cy.testId('reset').click();
    });

    cy.testId('form-error').should(
      'have.text',
      'If the email exists in Gamer One you will receive an email shortly.',
    );
  });
});
