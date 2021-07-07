/// <reference types="cypress" />
/// <reference types="../../support" />

context('Now Playing - Modal', () => {
  const MODAL_NAME = 'now-playing-dialog';

  const successTitle = 'Success';
  const successAddUpdateMessage = 'Now playing updated.';
  const successDeleteMessage = 'Now playing deleted.';

  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(900); // so animation can finish

    // aliases
    cy.testId('card-now-playing').within(() => {
      cy.testId('card-edit').as('edit');
    });
  });

  it('should have edit button', () => {
    cy.get('@edit').should('exist');
  });

  it('should open edit modal', () => {
    cy.get('@edit').click();
    cy.testId(MODAL_NAME).should('be.visible');
  });

  it('should have title now playing', () => {
    cy.get('@edit').click();
    cy.testId(MODAL_NAME).within(() => {
      cy.get('h4').should('have.text', 'Now Playing');
    });
  });

  it('should have field labels', () => {
    cy.get('@edit').click();

    cy.testId('game-label').should('have.text', 'Game');
    cy.testId('watchHere-label').should('have.text', 'Watch Here');
    cy.testId('online-label').should('have.text', 'Online');
  });

  it('should have buttons', () => {
    cy.get('@edit').click();

    cy.testId(MODAL_NAME).within(() => {
      // delete
      cy.testId('delete').should('exist');
      cy.testId('delete').should('be.disabled');

      // cancel
      cy.testId('cancel').should('exist');
      cy.testId('cancel').should('be.enabled');

      // save
      cy.testId('save').should('exist');
      cy.testId('save').should('be.disabled');
    });
  });

  it('should cancel', () => {
    // open modal
    cy.get('@edit').click();

    cy.testId(MODAL_NAME).within(() => {
      cy.testId('cancel').click();
      cy.testId(MODAL_NAME).should('not.be.visible');
    });
  });

  it('game field validation', () => {
    cy.get('@edit').click();

    cy.testId(MODAL_NAME).within(() => {
      // required
      cy.testId('game').focus().blur();
      cy.testId('game-error').should('exist');
      cy.testId('game-error').should('have.text', 'Required');
    });
  });

  it('watch here field', () => {
    // open modal
    cy.get('@edit').click();

    // todo
  });

  it('online field', () => {
    // open modal
    cy.get('@edit').click();

    // todo
  });

  it('should search, select and save now playing', () => {
    // open modal
    cy.get('@edit').click();

    cy.testId(MODAL_NAME).within(() => {
      // search
      cy.testId('game').should('be.empty');
      cy.testId('game').type('Fortnite');
      cy.testId('game-wrapper').within(() => {
        cy.testId('input-loading').should('exist');
        cy.testId('input-loading').should('not.exist');
      });

      // select game
      cy.testId('game-results').should('exist');
      cy.testId('list-item-game').should('exist');
      cy.testId('list-item-game').click();
      cy.testId('game-results').should('not.exist');

      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddUpdateMessage);
    cy.notify().should('not.exist');

    cy.get('@edit').click();

    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
    cy.notify().should('not.exist');
  });

  // it('should delete now playing', () => {
  //   // open modal
  //   cy.get('@edit').click();

  //   // todo
  // });

  it.only('should have watch buttons', () => {
    // open social card
    cy.testId('card-social').within(() => {
      cy.testId('card-edit').click();
    });

    // add social networth
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('add').as('addSocialNetwork');
    });

    // Twitch
    cy.get('@addSocialNetwork').click();
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('socialNetworkId').select('Twitch');
      cy.testId('url').type('gamerone_twitch');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Facebook
    cy.get('@addSocialNetwork').click();
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('socialNetworkId').select('Facebook');
      cy.testId('url').type('gamerone_facebook');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // YouTube
    cy.get('@addSocialNetwork').click();
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('socialNetworkId').select('YouTube');
      cy.testId('url').type('/user/gamerone');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // open currently playing
    cy.get('@edit').click();

    // watch here options visible
    cy.testId(MODAL_NAME).within(() => {
      cy.testId('facebook-label').should('have.text', 'Facebook');
      cy.testId('twitch-label').should('have.text', 'Twitch');
      cy.testId('youtube-label').should('have.text', 'YouTube');

      // todo more tests - unchecked etc

      // todo test if buttons appear when checked.
    });

    // close now playing
    cy.testId(MODAL_NAME).within(() => {
      cy.testId('cancel').click();
    });

    // delete social networks
    // open social card
    cy.testId('card-social').within(() => {
      cy.testId('card-edit').click();
    });

    // delete social network
    cy.testId('social-network-list').within(() => {
      cy.testId('network').eq(0).click();
    });
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // delete social network
    cy.testId('social-network-list').within(() => {
      cy.testId('network').eq(0).click();
    });
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // delete social network
    cy.testId('social-network-list').within(() => {
      cy.testId('network').eq(0).click();
    });
    cy.testId('social-settings-dialog').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');
  });
});
