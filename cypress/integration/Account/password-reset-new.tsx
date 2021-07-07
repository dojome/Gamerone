/// <reference types="cypress" />

context('Password Reset - New', () => {
  beforeEach(() => {
    cy.visit(
      '/account/password-reset-new?token=Ej23xKmELdgRknDK&email=cypress@gamerone.gg',
    );
  });

  it('should not show form', () => {
    cy.visit('/account/password-reset-new');
    cy.url().should('be', '/');
  });

  it('should have field labels', () => {
    cy.testId('password-label').should('have.text', 'New Password');
    cy.testId('confirmPassword-label').should('have.text', 'Confirm Password');
  });

  it('should have inputs and be empty on load', () => {
    cy.testId('password').should('exist');
    cy.testId('password').should('be.empty');

    cy.testId('confirm-password').should('exist');
    cy.testId('confirm-password').should('be.empty');
  });

  it('has set new button', () => {
    cy.testId('form').within(() => {
      cy.testId('save').should('have.text', 'Save');
    });
  });

  it('set new button disabled on load', () => {
    cy.testId('form').within(() => {
      cy.testId('save').contains('Save').should('be.disabled');
    });
  });

  it('password field required', () => {
    cy.testId('password').focus().blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should('have.text', 'Required');
  });

  it('password field minLength of 8', () => {
    cy.testId('password').focus().type('ABC').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Must be at least 8 characters long.',
    );
  });

  it('password field contain at least one uppercase', () => {
    cy.testId('password').clear().type('cypresstest.123').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  it('password field contain at least one lowercase', () => {
    cy.testId('password').clear().type('CYPRESSTEST.123').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  it('password field contain at least one digit', () => {
    cy.testId('password').clear().type('CYPRESS.TEST').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  it('password field contain at least one special character', () => {
    cy.testId('password').clear().type('CypressTest123').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  // Confirm Password

  it('confirm password does not match password', () => {
    cy.testId('password').clear().type('CypressTest.123');
    cy.testId('confirm-password').clear().type('cypresstest.123').blur();

    cy.testId('confirmPassword-error').should('exist');
    cy.testId('confirmPassword-error').should(
      'have.text',
      'Passwords do not match.',
    );
  });
});
