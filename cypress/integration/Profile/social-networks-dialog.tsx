/// <reference types="cypress" />
/// <reference types="../../support" />

context('Social Networks - Dialog', () => {
  const successTitle = 'Success';
  const successAddMessage = 'Social networks updated.';
  const successDeleteMessage = 'Social network deleted.';

  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(900); // so animation can finish

    cy.testId('card-social').within(() => {
      cy.testId('card-edit').click();
    });

    // aliases
    cy.testId('social-settings-dialog').as('dialog');
  });

  it('should open edit modal', () => {
    cy.get('@dialog').should('exist');
  });

  it('should have title social networks', () => {
    cy.get('@dialog').within(() => {
      cy.get('h4').should('have.text', 'Social Networks');
    });
  });

  it('should have no social networks', () => {
    cy.get('@dialog').within(() => {
      cy.get('p').should('have.text', 'No Social Networks yet.');
    });
  });

  it('should have add button and be enabled', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').should('be.enabled');
      cy.testId('add').should('have.text', 'Add Social Network');
    });
  });

  it('should show form', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').should('exist');
  });

  it('should have field labels', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      cy.testId('socialNetworkId-label').should('have.text', 'Social Network');
      cy.testId('url-label').should('have.text', 'Username or Path');
    });
  });

  it('should have buttons on add new', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      // cancel
      cy.testId('cancel').should('exist');
      cy.testId('cancel').should('be.enabled');

      // save
      cy.testId('save').should('exist');
      cy.testId('save').should('be.disabled');
    });
  });

  it('should cancel', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      cy.testId('cancel').click();
    });
    cy.testId('form').should('not.exist');
  });

  it('social network field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      // required
      cy.testId('socialNetworkId').focus().blur();
      cy.testId('socialNetworkId-error').should('exist');
      cy.testId('socialNetworkId-error').should('have.text', 'Required');

      // error message gone
      cy.testId('socialNetworkId').select('Twitter');
      cy.testId('socialNetworkId-error').should('not.exist');
    });
  });

  it('url field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      // maxLength of 100
      cy.testId('url').should('have.attr', 'maxlength').and('eq', '100');

      // required
      cy.testId('url').clear();
      cy.testId('url').focus().blur();
      cy.testId('url-error').should('exist');
    });
  });

  it('should add one and delete social network', () => {
    // add
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      cy.testId('socialNetworkId').select('Twitter');
      cy.testId('url').should('be.empty');
      cy.testId('url').type('WeAreGamerOne');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);

    // delete social network
    cy.testId('social-network-list').within(() => {
      cy.testId('social-network').eq(0).click();
    });

    cy.testId('form').within(() => {
      cy.testId('delete').should('exist');
      cy.testId('delete').should('be.enabled');
      cy.testId('delete').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should add, update and delete one social network', () => {
    // add
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      cy.testId('socialNetworkId').select('Twitter');
      cy.testId('url').should('be.empty');
      cy.testId('url').type('WeAreGamerOne');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // update network
    cy.testId('social-network-list').within(() => {
      cy.testId('social-network').eq(0).click();
    });

    // update url
    cy.testId('form').within(() => {
      cy.testId('url').clear().type('WeAreG1');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    cy.testId('social-network-list').within(() => {
      // cy.testId('social-network').eq(0).get('h3').should('have.text', 'WeAreG1');
      cy.testId('social-network').eq(0).click();
    });
    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should have max of four social networks', () => {
    // alias
    cy.get('@dialog').within(() => {
      cy.testId('add').as('add');
    });

    // Discord
    cy.get('@add').click();
    cy.testId('form').within(() => {
      cy.testId('socialNetworkId').select('Discord');
      cy.testId('url').should('be.empty');
      cy.testId('url').type('gamerone');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Twitter
    cy.get('@add').click();
    cy.testId('form').within(() => {
      cy.testId('socialNetworkId').select('Twitter');
      cy.testId('url').should('be.empty');
      cy.testId('url').type('WeAreGamerOne');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // YouTube
    cy.get('@add').click();
    cy.testId('form').within(() => {
      cy.testId('socialNetworkId').select('YouTube');
      cy.testId('url').should('be.empty');
      cy.testId('url').type('/user/NinjasHyper');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Twitch
    cy.get('@add').click();
    cy.testId('form').within(() => {
      cy.testId('socialNetworkId').select('Twitch');
      cy.testId('url').should('be.empty');
      cy.testId('url').type('WeAreGamerOne');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    cy.testId('add').should('be.disabled');

    // delete
    cy.testId('social-network-list').within(() => {
      cy.testId('social-network').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // delete
    cy.testId('social-network-list').within(() => {
      cy.testId('social-network').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // delete
    cy.testId('social-network-list').within(() => {
      cy.testId('social-network').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // delete
    cy.testId('social-network-list').within(() => {
      cy.testId('social-network').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    cy.get('@dialog').within(() => {
      cy.get('p').should('have.text', 'No Social Networks yet.');
    });
  });
});
