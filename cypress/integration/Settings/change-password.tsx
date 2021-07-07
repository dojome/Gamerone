/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Settings - Change Password', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/settings/password');
  });

  it('should have page title', () => {
    cy.title().should('eq', 'Change Password | Gamer One');
  });

  it('should have field labels', () => {
    cy.testId('password-label').should('have.text', 'Current Password');
    cy.testId('newPassword-label').should('have.text', 'New Password');
  });

  it('should have inputs and be empty on load', () => {
    cy.testId('password').should('exist');
    cy.testId('password').should('be.empty');

    cy.testId('new-password').should('exist');
    cy.testId('new-password').should('be.empty');
  });

  it('has save button', () => {
    cy.testId('form').within(() => {
      cy.testId('save').should('have.text', 'Save');
    });
  });

  it('save button disabled on load', () => {
    cy.testId('form').within(() => {
      cy.testId('save').contains('Save').should('be.disabled');
    });
  });

  // Current Password
  it('password max length', () => {
    // maxLength of 64
    cy.testId('password').should('have.attr', 'maxlength').and('eq', '64');
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

  // New Password

  it('new password max length', () => {
    // maxLength of 64
    cy.testId('new-password').should('have.attr', 'maxlength').and('eq', '64');
  });

  it('new password field required', () => {
    cy.testId('new-password').focus().blur();
    cy.testId('newPassword-error').should('exist');
    cy.testId('newPassword-error').should('have.text', 'Required');
  });

  it('new password field minLength of 8', () => {
    cy.testId('new-password').focus().type('ABC').blur();
    cy.testId('newPassword-error').should('exist');
    cy.testId('newPassword-error').should(
      'have.text',
      'Must be at least 8 characters long.',
    );
  });

  it('new password field contain at least one lowercase', () => {
    cy.testId('new-password').clear().type('CYPRESSTEST.123').blur();
    cy.testId('newPassword-error').should('exist');
    cy.testId('newPassword-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  it('new password field contain at least one digit', () => {
    cy.testId('new-password').clear().type('CYPRESS.TEST').blur();
    cy.testId('newPassword-error').should('exist');
    cy.testId('newPassword-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  it('new password field contain at least one special character', () => {
    cy.testId('new-password').clear().type('CypressTest123').blur();
    cy.testId('newPassword-error').should('exist');
    cy.testId('newPassword-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  // Passwords Match

  // it('new password does not match password', () => {
  //   cy.testId('password').clear().type('CypressTest.123');
  //   cy.testId('new-password').clear().type('cypressTest.123').blur();

  //   cy.testId('newPassword-error').should('exist');
  //   cy.testId('newPassword-error').should(
  //     'have.text',
  //     'Passwords do not match',
  //   );
  // });
});
