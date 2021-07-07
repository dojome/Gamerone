/// <reference types="cypress" />

context('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should have field labels', () => {
    cy.testId('email-label').should('have.text', 'Email');
    cy.testId('username-label').should('have.text', 'Username');
    cy.testId('password-label').should('have.text', 'Password');
  });

  it('should have password hint', () => {
    cy.testId('password-hint').should('exist');
    cy.testId('password-hint').should(
      'have.text',
      'A password must contain an uppercase, lowercase, a special character and a number.',
    );
  });

  it('should have legal notice', () => {
    cy.testId('legal').should('exist');
    cy.testId('legal').should(
      'have.text',
      'By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.',
    );
  });

  it('should have input and be empty on load', () => {
    cy.testId('email').should('exist');
    cy.testId('email').should('be.empty');

    cy.testId('username').should('exist');
    cy.testId('username').should('be.empty');

    cy.testId('password').should('exist');
    cy.testId('password').should('be.empty');
  });

  it('has sign up button', () => {
    cy.testId('form').within(() => {
      cy.testId('signup').should('have.text', 'Sign Up');
    });
  });

  it('sign up button disabled on load', () => {
    cy.testId('form').within(() => {
      cy.testId('signup').contains('Sign Up').should('be.disabled');
    });
  });

  it('email field validation', () => {
    // maxLength of 254
    cy.testId('email').should('have.attr', 'maxlength').and('eq', '254');

    // required
    cy.testId('email').focus().blur();
    cy.testId('email-error').should('exist');
    cy.testId('email-error').should('have.text', 'Required');

    // correct email format
    cy.testId('email').focus().type('cypress').blur();
    cy.testId('email-error').should('exist');
    cy.testId('email-error').should('have.text', 'Email format incorrect.');

    cy.testId('email').focus().type('cypress@gamerone').blur();
    cy.testId('email-error').should('exist');
    cy.testId('email-error').should('have.text', 'Email format incorrect.');

    // duplicated
    cy.testId('email').clear().type('admin@gamerone.gg').blur();
    cy.testId('email-error').should('exist');
    cy.testId('email-error').should('have.text', 'Email already exists.');
  });

  it('username field validation', () => {
    // maxLength of 30
    cy.testId('username').should('have.attr', 'maxlength').and('eq', '30');

    // required
    cy.testId('username').focus().blur();
    cy.testId('username-error').should('exist');
    cy.testId('username-error').should('have.text', 'Required');

    // minLength of 3 characters
    cy.testId('username').focus().type('X').blur();
    cy.testId('username-error').should('exist');
    cy.testId('username-error').should(
      'have.text',
      'Must be at least 3 characters long.',
    );

    // duplicated
    cy.testId('username').clear().type('admin').blur();
    cy.get('#uniqueUsernameSpinner').should('not.exist');
    cy.testId('username-error').should('exist');
    cy.testId('username-error').should('have.text', 'Username already exists.');
  });

  it('password field validation', () => {
    // maxLength of 64
    cy.testId('password').should('have.attr', 'maxlength').and('eq', '64');

    // required
    cy.testId('password').focus().blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should('have.text', 'Required');

    // minLength of 8 characters
    cy.testId('password').focus().type('ABC').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Must be at least 8 characters long.',
    );

    // Password must contain at least one uppercase
    cy.testId('password').clear().type('cypresstest.123').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );

    // Password must contain at least one lowercase
    cy.testId('password').clear().type('CYPRESSTEST.123').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );

    // Password must contain at least one digit
    cy.testId('password').clear().type('CYPRESS.TEST').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );

    // Password must contain at least one special character
    cy.testId('password').clear().type('CypressTest123').blur();
    cy.testId('password-error').should('exist');
    cy.testId('password-error').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter.',
    );
  });

  it('form should be valid', () => {
    cy.testId('email')
      .type('cypress-valid@gamerone.gg')
      .should('have.value', 'cypress-valid@gamerone.gg');

    cy.testId('username').type('cypress').should('have.value', 'cypress');

    cy.testId('password')
      .type('CypressTest.123')
      .should('have.value', 'CypressTest.123')
      .blur();

    cy.testId('form').within(() => {
      cy.testId('signup').should('be.enabled');
    });
  });
});
