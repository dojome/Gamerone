/// <reference types="cypress" />

context('Log In', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should have field labels', () => {
    cy.testId('email-label').should('have.text', 'Email');
    cy.testId('password-label').should('have.text', 'Password');
  });

  it('should have forgot password link', () => {
    cy.testId('forgot-password').should('exist');
  });

  it('should have input and be empty on load', () => {
    cy.testId('email').should('exist');
    cy.testId('email').should('be.empty');

    cy.testId('password').should('exist');
    cy.testId('password').should('be.empty');
  });

  it('has log in button', () => {
    cy.testId('form').within(() => {
      cy.testId('login').should('have.text', 'Log In');
    });
  });

  it('form should be valid but fail login', () => {
    cy.testId('email')
      .type('cypress-not-found@gamerone.gg')
      .should('have.value', 'cypress-not-found@gamerone.gg');

    cy.testId('password')
      .type('Cypress.Test123')
      .should('have.value', 'Cypress.Test123')
      .blur();

    cy.testId('form').within(() => {
      cy.testId('login').should('be.enabled');
      cy.testId('login').click();
    });

    cy.waitForInputLoading();

    cy.testId('form-error').should(
      'have.text',
      'Email or password is incorrect.',
    );
  });

  it('form should be valid and login', () => {
    cy.testId('email')
      .type('cypress@gamerone.gg')
      .should('have.value', 'cypress@gamerone.gg');

    cy.testId('password')
      .type('ZEwB!C4sq@zkkhE77beFCpiBUT')
      .should('have.value', 'ZEwB!C4sq@zkkhE77beFCpiBUT')
      .blur();

    cy.testId('form').within(() => {
      cy.testId('login').should('be.enabled');
      cy.testId('login')
        .click()
        .should(() => {
          expect(localStorage.getItem('id_token')).to.exist;
        });
    });
  });
});
