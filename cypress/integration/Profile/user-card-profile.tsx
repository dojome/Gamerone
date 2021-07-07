/// <reference types="cypress" />
/// <reference types="../../support" />

context('Settings - Profile', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');

    // open modal and navigate to profile form
    cy.testId('card-user').within(() => {
      cy.testId('card-edit').click();
    });
    cy.get('[data-testid="tab-nav"] > li').children().eq(2).click();
  });

  it('should be on profile tab', () => {
    cy.testId('profile-tab-pane').should('exist');
  });

  it('should have field labels', () => {
    cy.testId('username-label').should('have.text', 'Username');
    cy.testId('email-label').should('have.text', 'Email');
    cy.testId('firstName-label').should('have.text', 'First Name');
    cy.testId('lastName-label').should('have.text', 'Last Name');
    cy.testId('location-label').should('have.text', 'Location');
    cy.testId('bio-label').should('have.text', 'Bio');
    cy.testId('birthDate-label').should('have.text', 'Birth Date');
    cy.testId('websiteUrl-label').should('have.text', 'Website URL');
  });

  it('has sign up button', () => {
    cy.testId('form').within(() => {
      cy.testId('save').should('have.text', 'Save');
    });
  });

  it('sign up button disabled on load', () => {
    cy.testId('form').within(() => {
      cy.testId('save').contains('Save').should('be.disabled');
    });
  });

  it('username field validation', () => {
    // maxLength of 30
    cy.testId('username').should('have.attr', 'maxlength').and('eq', '30');

    // required
    cy.testId('username').clear();
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

  it('email field validation', () => {
    // maxLength of 254
    cy.testId('email').should('have.attr', 'maxlength').and('eq', '254');

    // required
    cy.testId('email').clear();
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

  it('first name field validation', () => {
    // maxLength of 50
    cy.testId('firstName').should('have.attr', 'maxlength').and('eq', '50');

    // required
    cy.testId('firstName').clear();
    cy.testId('firstName').focus().blur();
    cy.testId('firstName-error').should('exist');
    cy.testId('firstName-error').should('have.text', 'Required');
  });

  it('last name field validation', () => {
    // maxLength of 50
    cy.testId('lastName').should('have.attr', 'maxlength').and('eq', '50');

    // required
    cy.testId('lastName').clear();
    cy.testId('lastName').focus().blur();
    cy.testId('lastName-error').should('exist');
    cy.testId('lastName-error').should('have.text', 'Required');
  });

  it('location field validation', () => {
    // maxLength of 100
    cy.testId('location').should('have.attr', 'maxlength').and('eq', '100');

    // not required
    cy.testId('location').clear();
    cy.testId('location').focus().blur();
    cy.testId('location-error').should('not.exist');
  });

  it('bio field validation', () => {
    // maxLength of 116
    cy.testId('bio').should('have.attr', 'maxlength').and('eq', '116');

    // not required
    cy.testId('bio').clear();
    cy.testId('bio').focus().blur();
    cy.testId('bio-error').should('not.exist');
  });

  it('birth date field validation', () => {
    // not required
    cy.testId('birthDate').click();
    cy.testId('birthDate-calendar').should('exist');
    cy.testId('birthDate').click();
  });

  it('websiteUrl field validation', () => {
    // maxLength of 100
    cy.testId('websiteUrl').should('have.attr', 'maxlength').and('eq', '100');

    // not required
    cy.testId('websiteUrl').clear();
    cy.testId('websiteUrl').focus().blur();
    cy.testId('websiteUrl-error').should('not.exist');

    // url pattern test
    cy.testId('websiteUrl').clear().type('gamerone').blur();
    cy.testId('websiteUrl-error').should('exist');
    cy.testId('websiteUrl-error').should(
      'have.text',
      'URL format is incorrect. Must start with https:// or yourdomain.',
    );

    // url pattern test
    cy.testId('websiteUrl').clear().type('http:gamerone.gg').blur();
    cy.testId('websiteUrl-error').should('exist');
    cy.testId('websiteUrl-error').should(
      'have.text',
      'URL format is incorrect. Must start with https:// or yourdomain.',
    );

    // url pattern test
    cy.testId('websiteUrl').clear().type('http://gamerone.gg').blur();
    cy.testId('websiteUrl-error').should('not.exist');

    // url pattern test
    cy.testId('websiteUrl')
      .clear()
      .type(
        'https://steelseries.com/gaming-headsets/arctis-pro-wireless?color=black',
      )
      .blur();
    cy.testId('websiteUrl-error').should('not.exist');
  });
});
