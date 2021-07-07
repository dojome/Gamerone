/// <reference types="cypress" />

context('Email Verify', () => {
  it('should redirect to login', () => {
    cy.visit('/account/email-verify');
    cy.url().should('include', '/login');
  });

  it('should not verify', () => {
    cy.visit('/account/email-verify/example@domain.com/token');
    cy.testId('title').should('have.text', 'Not Verified');
    cy.testId('message').should(
      'have.text',
      'Your account was not found or your token might be expired.',
    );
  });

  it('should go home when button clicked', () => {
    cy.visit('/account/email-verify/example@domain.com/token');
    cy.testId('home').should('exist');
    cy.testId('home').should('have.text', 'Home');
    cy.testId('home').click();
    cy.url().should('include', '/');
  });

  // it('should verify', () => {
  //   cy.visit('/account/email-verify/cypress@gamerone.gg/EldlfD5vFc');
  // });
});
