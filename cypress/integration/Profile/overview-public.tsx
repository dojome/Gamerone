/// <reference types="cypress" />
/// <reference types="../../support" />

context('Overview: Public', () => {
  beforeEach(() => {
    cy.visit('/cypress-test');

    // aliases
    cy.get('[data-testid="profile-nav"] > li').as('menu');
  });

  it('should have page title', () => {
    cy.title().should('eq', 'cypress-test | Gamer One');
  });

  it('should have user card', () => {
    cy.testId('card-user').should('exist');
  });

  it('should have profile menu and menu items', () => {
    cy.testId('profile-nav').should('exist');

    cy.get('@menu').should('have.length', 5);
    cy.get('@menu').children().eq(0).should('have.text', 'Overview');
    cy.get('@menu').children().eq(1).should('have.text', 'Achievements');
    cy.get('@menu').children().eq(2).should('have.text', 'Experience');
    cy.get('@menu').children().eq(3).should('have.text', 'Gear');
    cy.get('@menu').children().eq(4).should('have.text', 'Games');
  });

  it('should display overview page by default', () => {
    cy.url().should('include', '/cypress-test');
    cy.get('@menu').children().eq(0).get('a').should('have.class', 'is-active');
  });

  it('should visit achievements page', () => {
    cy.get('@menu').children().eq(1).click();
    cy.url().should('include', '/cypress-test/achievements');
    cy.get('@menu').children().eq(1).get('a').should('have.class', 'is-active');
  });

  it('should visit experience page', () => {
    cy.get('@menu').children().eq(2).click();
    cy.url().should('include', '/cypress-test/experience');
    cy.get('@menu').children().eq(2).get('a').should('have.class', 'is-active');
  });

  it('should visit gear page', () => {
    cy.get('@menu').children().eq(3).click();
    cy.url().should('include', '/cypress-test/gear');
    cy.get('@menu').children().eq(3).get('a').should('have.class', 'is-active');
  });

  it('should visit games page', () => {
    cy.get('@menu').children().eq(4).click();
    cy.url().should('include', '/cypress-test/games');
    cy.get('@menu').children().eq(4).get('a').should('have.class', 'is-active');
  });

  it('should visit overview page', () => {
    cy.get('@menu').children().eq(0).click();
    cy.url().should('include', '/cypress-test');
    cy.get('@menu').children().eq(0).get('a').should('have.class', 'is-active');
  });

  it('should display all default cards', () => {
    cy.testId('card-sponsors').should('exist');
    cy.testId('card-achievements').should('exist');
    cy.testId('card-latest-post').should('exist');
    cy.testId('card-now-playing').should('exist');
    cy.testId('card-social').should('exist');
    cy.testId('card-store').should('exist');
    cy.testId('card-squad').should('exist');
    cy.testId('card-timeline').should('exist');
    cy.testId('card-schedule').should('not.exist'); // should exist when feature complete
  });
});
