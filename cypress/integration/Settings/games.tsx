/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Settings - Games', () => {
  const MODAL_NAME = 'add-game-dialog';

  const successTitle = 'Success';
  const successAddMessage = 'Successfully added a game';
  const successUpdateMessage = 'Successfully updated a game';
  const successDeleteMessage = 'Successfully deleted a game';

  beforeEach(() => {
    cy.login();
    cy.visit('/settings/games');

    // aliases
    cy.testId('add').as('add');
  });

  it('should have page title', () => {
    cy.title().should('eq', 'Games | Gamer One');
  });

  it('has add button', () => {
    cy.get('@add').should('have.text', 'Add');
  });

  it('should open add modal', () => {
    cy.get('@add').click();
    cy.testId(MODAL_NAME).should('exist');
  });

  it('should have title store', () => {
    cy.get('@add').click();
    cy.testId('dialog-header').within(() => {
      cy.get('h4').should('have.text', 'Add Game');
    });
  });

  it('should have field labels', () => {
    cy.get('@add').click();

    cy.testId('game-label').should('have.text', 'Game');
    cy.testId('gamerTag-label').should('have.text', 'Gamer Tag');
    cy.testId('platform-label').should('have.text', 'Platform');
    cy.testId('region-label').should('have.text', 'Region');
  });

  it('should have buttons', () => {
    cy.get('@add').click();

    // cancel
    cy.testId('cancel').should('exist');
    cy.testId('cancel').should('be.enabled');

    // save
    cy.testId('save').should('exist');
    cy.testId('save').should('be.disabled');
  });

  it('should cancel', () => {
    // open modal
    cy.get('@add').click();

    cy.testId(MODAL_NAME).should('be.visible');
    cy.testId('cancel').click();
    cy.testId(MODAL_NAME).should('not.be.visible');
  });

  it('game field validation', () => {
    // open modal
    cy.get('@add').click();

    // required
    cy.testId('game').focus().blur();
    cy.testId('game-error').should('exist');
    cy.testId('game-error').should('have.text', 'Required');
  });

  it('gamer tag field validation', () => {
    // open modal
    cy.get('@add').click();

    // maxLength of 30
    cy.testId('gamerTag').should('have.attr', 'maxlength').and('eq', '30');

    // not required
    cy.testId('gamerTag').focus().blur();
    cy.testId('gamerTag-error').should('not.exist');

    // minLength of 3
    cy.testId('gamerTag').focus().type('cy').blur();
    cy.testId('gamerTag-error').should('exist');
    cy.testId('gamerTag-error').should(
      'have.text',
      'Must be at least 3 characters long.',
    );
  });

  it('platform field validation', () => {
    // open modal
    cy.get('@add').click();

    // not required
    cy.testId('platform').focus().blur();
    cy.testId('platform-error').should('not.exist');
  });

  it('region field validation', () => {
    // open modal
    cy.get('@add').click();

    // maxLength of 30
    cy.testId('region').should('have.attr', 'maxlength').and('eq', '30');

    // not required
    cy.testId('region').focus().blur();
    cy.testId('region-error').should('not.exist');

    // minLength of 3
    cy.testId('region').focus().type('y').blur();
    cy.testId('region-error').should('exist');
    cy.testId('region-error').should(
      'have.text',
      'Must be at least 2 characters long.',
    );
  });

  it('should add and delete one game with all fields', () => {
    // open modal
    cy.get('@add').click();

    // search
    cy.testId('game').should('be.empty');
    cy.testId('game').type('Valorant');
    cy.testId('game-wrapper').within(() => {
      cy.testId('input-loading').should('exist');
      cy.testId('input-loading').should('not.exist');
    });

    // select game
    cy.testId('game-results').should('exist');
    cy.testId('list-item-game').should('exist');
    cy.testId('list-item-game').click();
    cy.testId('game-results').should('not.exist');

    // gamer tag
    cy.testId('gamerTag').should('be.empty');
    cy.testId('gamerTag').type('gamer0ne');

    // region
    cy.testId('region').should('be.empty');
    cy.testId('region').type('NA');
    cy.testId('save').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // delete game
    cy.testId('game-list').within(() => {
      cy.testId('game-item')
        .eq(0)
        .within(() => {
          cy.get('h3').should('have.text', 'VALORANT');
        });
      cy.testId('game-item').eq(0).click();
    });
    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should add and delete one game with required fields only', () => {
    // open modal
    cy.get('@add').click();

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

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // delete game
    cy.testId('game-list').within(() => {
      cy.testId('game-item')
        .eq(0)
        .within(() => {
          cy.get('h3').should('have.text', 'Fortnite');
        });
      cy.testId('game-item').eq(0).click();
    });
    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should add and delete one game with multiple search results', () => {
    // open modal
    cy.get('@add').click();

    // search
    cy.testId('game').should('be.empty');
    cy.testId('game').type('league of');
    cy.testId('game-wrapper').within(() => {
      cy.testId('input-loading').should('exist');
      cy.testId('input-loading').should('not.exist');
    });

    // select game
    cy.testId('game-results').should('exist');
    cy.testId('list-item-game').should('exist');
    cy.testId('list-item-game').eq(0).click();
    cy.testId('game-results').should('not.exist');

    // gamer tag
    cy.testId('gamerTag').should('be.empty');
    cy.testId('gamerTag').type('gamer0ne');

    // region
    cy.testId('region').should('be.empty');
    cy.testId('region').type('NA');
    cy.testId('save').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // delete game
    cy.testId('game-list').within(() => {
      cy.testId('game-item')
        .eq(0)
        .within(() => {
          cy.get('h3').should('have.text', 'League of Legends');
        });
      cy.testId('game-item').eq(0).click();
    });
    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should add, update and delete one game with all fields', () => {
    // open modal
    cy.get('@add').click();

    // search
    cy.testId('game').should('be.empty');
    cy.testId('game').type('Valorant');
    cy.testId('game-wrapper').within(() => {
      cy.testId('input-loading').should('exist');
      cy.testId('input-loading').should('not.exist');
    });

    // select game
    cy.testId('game-results').should('exist');
    cy.testId('list-item-game').should('exist');
    cy.testId('list-item-game').click();
    cy.testId('game-results').should('not.exist');

    // gamer tag
    cy.testId('gamerTag').should('be.empty');
    cy.testId('gamerTag').type('gamer0ne');

    // region
    cy.testId('region').should('be.empty');
    cy.testId('region').type('NA');
    cy.testId('save').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // update gamer tag
    cy.testId('game-list').within(() => {
      cy.testId('game-item')
        .eq(0)
        .within(() => {
          cy.get('h3').should('have.text', 'VALORANT');
        });
      cy.testId('game-item').eq(0).click();
    });

    cy.testId('gamerTag').should('have.value', 'gamer0ne');
    cy.testId('gamerTag').clear().type('g1user');
    cy.testId('save').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successUpdateMessage);
    cy.notify().should('not.exist');

    // delete game
    cy.testId('game-list').within(() => {
      cy.testId('game-item')
        .eq(0)
        .within(() => {
          cy.get('h3').should('have.text', 'VALORANT');
        });
      cy.testId('game-item').eq(0).click();
    });
    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });
});
