/// <reference types="cypress" />
/// <reference types="../../support" />

describe('User Card - Visiblity', () => {
  const MODAL_NAME = 'card-visibility-dialog';
  const successTitle = 'Success';
  const successMessage = 'Successfully updated your profile layout settings';

  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');
    cy.testId('edit-layout').click();
    cy.testId('visibility-layout').click();

    // aliases
    cy.testId('modal-actions').within(() => {
      cy.testId('save').as('save');
      cy.testId('cancel').as('cancel');
    });
  });

  it('should open modal', () => {
    cy.testId(MODAL_NAME).should('exist');
  });

  it('should have title card visibility', () => {
    cy.testId('modal-header').within(() => {
      cy.get('h4').should('have.text', 'Card Visibility');
    });
  });

  it('should have buttons', () => {
    // cancel
    cy.get('@cancel').should('exist');
    cy.get('@cancel').should('be.enabled');
    cy.get('@cancel').should('have.text', 'Cancel');

    // update
    cy.get('@save').should('exist');
    cy.get('@save').should('be.disabled');
    cy.get('@save').should('have.text', 'Update');
  });

  it('should cancel', () => {
    cy.get('@cancel').click();
    cy.testId(MODAL_NAME).should('not.exist');
  });

  it('should have field labels', () => {
    cy.testId('sponsors-label').should('have.text', 'Sponsors');
    cy.testId('socialNetworks-label').should('have.text', 'Social Networks');
    cy.testId('nowPlaying-label').should('have.text', 'Now Playing');
    cy.testId('gear-label').should('have.text', 'Gear');
    cy.testId('achievements-label').should('have.text', 'Achievements');
    cy.testId('store-label').should('have.text', 'Store');
    cy.testId('squad-label').should('have.text', 'Squad');
    // cy.testId('schedule-label').should('have.text', 'Schedule');
  });

  it('should update achievements ', () => {
    // uncheck achievements
    cy.testId('achievements').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check achievements
    cy.testId('achievements').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });

  it('should update gear ', () => {
    // uncheck gear
    cy.testId('gear').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check gear
    cy.testId('gear').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });

  it('should update now playing ', () => {
    // uncheck now playing
    cy.testId('nowPlaying').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check now playing
    cy.testId('nowPlaying').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });

  it('should update social networks', () => {
    // uncheck sponsors
    cy.testId('socialNetworks').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check social networks
    cy.testId('socialNetworks').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });

  it('should update sponsors ', () => {
    // uncheck sponsors
    cy.testId('sponsors').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check sponsors
    cy.testId('sponsors').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });

  it('should update squad ', () => {
    // uncheck squad
    cy.testId('squad').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check squad
    cy.testId('squad').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });

  it('should update store ', () => {
    // uncheck store
    cy.testId('store').uncheck();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);

    // open modal
    cy.testId('visibility-layout').click();

    // check store
    cy.testId('store').check();
    cy.get('@save').should('be.enabled');
    cy.get('@save').click();
    cy.testId('input-loading').should('exist');

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successMessage);
  });
});
