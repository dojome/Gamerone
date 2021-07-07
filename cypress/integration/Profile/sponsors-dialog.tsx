/// <reference types="cypress" />
/// <reference types="../../support" />

context('Sponsors - Dialog', () => {
  const fileName = 'sponsor-twitch.png';

  const successTitle = 'Success';
  const successAddMessage = 'Successfully added a sponsor';
  const successDeleteMessage = 'Sponsor deleted successfully';
  const successUpdateMessage = 'Sponsor updated successfully.';

  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(900); // so animation can finish

    cy.testId('card-sponsors').within(() => {
      cy.testId('card-edit').click();
    });

    // aliases
    cy.testId('sponsor-settings-dialog').as('dialog');
  });

  it('should open edit modal', () => {
    cy.get('@dialog').should('exist');
  });

  it('should have title sponsors', () => {
    cy.get('@dialog').within(() => {
      cy.get('h4').should('have.text', 'Sponsors');
    });
  });

  it('should have no sponsors', () => {
    cy.get('@dialog').within(() => {
      cy.get('p').should('have.text', 'No Sponsors yet.');
    });
  });

  it('should have add button and be enabled', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').should('be.enabled');
      cy.testId('add').should('have.text', 'Add Sponsor');
    });
  });

  it('should show form', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.get('form').should('exist');
    });
  });

  it('should have field labels', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.testId('sponsorImage').should('exist');
      cy.testId('sponsorName-label').should('have.text', 'Name');
      cy.testId('sponsorUrl-label').should('have.text', 'Website URL');
    });
  });

  it('should have buttons', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

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
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.testId('form').should('exist');
      cy.testId('cancel').click();
      cy.testId('form').should('not.exist');
    });
  });

  it('name field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      // maxLength of 50
      cy.testId('sponsorName').should('have.attr', 'maxlength').and('eq', '50');

      // required
      cy.testId('sponsorName').focus().blur();
      cy.testId('sponsorName-error').should('exist');
      cy.testId('sponsorName-error').should('have.text', 'Required');

      // minLength of 3
      cy.testId('sponsorName').focus().type('cy').blur();
      cy.testId('sponsorName-error').should('exist');
      cy.testId('sponsorName-error').should(
        'have.text',
        'Must be at least 3 characters long.',
      );
    });
  });

  it('website url field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      // maxLength of 255
      cy.testId('sponsorUrl').should('have.attr', 'maxlength').and('eq', '255');

      // not required
      cy.testId('sponsorUrl').clear();
      cy.testId('sponsorUrl').focus().blur();
      cy.testId('sponsorUrl-error').should('not.exist');

      // url pattern test
      cy.testId('sponsorUrl').clear().type('gamerone').blur();
      cy.testId('sponsorUrl-error').should('exist');
      cy.testId('sponsorUrl-error').should(
        'have.text',
        'URL format is incorrect. Must start with https:// or yourdomain.',
      );

      // url pattern test
      cy.testId('sponsorUrl').clear().type('http:gamerone.gg').blur();
      cy.testId('sponsorUrl-error').should('exist');
      cy.testId('sponsorUrl-error').should(
        'have.text',
        'URL format is incorrect. Must start with https:// or yourdomain.',
      );

      // url pattern test
      cy.testId('sponsorUrl').clear().type('http://gamerone.gg').blur();
      cy.testId('sponsorUrl-error').should('not.exist');

      // url pattern test
      cy.testId('sponsorUrl')
        .clear()
        .type(
          'https://steelseries.com/gaming-headsets/arctis-pro-wireless?color=black',
        )
        .blur();
      cy.testId('sponsorUrl-error').should('not.exist');
    });
  });

  it('image field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      // required
      cy.testId('sponsorName').type('Cypress Sponsor');
      cy.testId('save').click();
      cy.testId('sponsorImage-error').should('exist');
      cy.testId('sponsorImage-error').should('have.text', 'Image is required.');
    });
  });

  it('should add one and delete sponsor with all fields', () => {
    // Sponsor
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.testId('sponsorImage').should('be.empty');
      cy.testId('sponsorImage').attachFile(fileName, { force: true });
      cy.testId('sponsorName').should('be.empty');
      cy.testId('sponsorName').type('Cypress Sponsor 1');
      cy.testId('sponsorUrl').should('be.empty');
      cy.testId('sponsorUrl').type('https://twitch.tv');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // delete sponsor
    cy.get('@dialog').within(() => {
      cy.testId('sponsor-list').within(() => {
        cy.testId('sponsor').eq(0).click();
      });
      cy.testId('delete').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
    cy.notify().should('not.exist');
  });

  it('should add and delete one sponsor with no link', () => {
    // Sponsor
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.testId('sponsorImage').should('be.empty');
      cy.testId('sponsorImage').attachFile(fileName, { force: true });
      cy.testId('sponsorName').should('be.empty');
      cy.testId('sponsorName').type('Cypress Sponsor No Link');
      cy.testId('sponsorUrl').should('be.empty');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);

    // delete sponsor
    cy.get('@dialog').within(() => {
      cy.testId('sponsor-list').within(() => {
        cy.testId('sponsor').eq(0).click();
      });
      cy.testId('delete').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should add, update and delete one sponsor with all fields', () => {
    // Sponsor
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.testId('sponsorImage').should('be.empty');
      cy.testId('sponsorImage').attachFile(fileName, { force: true });
      cy.testId('sponsorName').should('be.empty');
      cy.testId('sponsorName').type('Cypress Sponsor 1');
      cy.testId('sponsorUrl').should('be.empty');
      cy.testId('sponsorUrl').type('https://twitch.tv');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // update sponsor
    cy.get('@dialog').within(() => {
      cy.testId('sponsor-list').within(() => {
        cy.testId('sponsor').eq(0).click();
      });

      // update name
      cy.testId('sponsorName').type(' Updated');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successUpdateMessage);
    cy.notify().should('not.exist');

    cy.get('@dialog').within(() => {
      cy.testId('sponsor-list').within(() => {
        // cy.testId('sponsor')
        //   .eq(0)
        //   .get('h3')
        //   .should('have.text', 'Cypress Sponsor 1 Updated');
        cy.testId('sponsor').eq(0).click();
      });
      cy.testId('delete').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should have max of five sponsors', () => {
    // Twitch 1
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.testId('sponsorImage').should('be.empty');
      cy.testId('sponsorImage').attachFile(fileName, { force: true });
      cy.testId('sponsorName').should('be.empty');
      cy.testId('sponsorName').type('Cypress Sponsor 1');
      cy.testId('sponsorUrl').should('be.empty');
      cy.testId('sponsorUrl').type('https://twitch.tv');
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Twitch 2
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.get('form').within(() => {
        cy.testId('sponsorImage').should('be.empty');
        cy.testId('sponsorImage').attachFile(fileName, { force: true });
        cy.testId('sponsorName').should('be.empty');
        cy.testId('sponsorName').type('Cypress Sponsor 2');
        cy.testId('sponsorUrl').should('be.empty');
        cy.testId('sponsorUrl').type('https://twitch2.tv');
        cy.testId('save').click();
      });
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Twitch 3
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.get('form').within(() => {
        cy.testId('sponsorImage').should('be.empty');
        cy.testId('sponsorImage').attachFile(fileName, { force: true });
        cy.testId('sponsorName').should('be.empty');
        cy.testId('sponsorName').type('Cypress Sponsor 3');
        cy.testId('sponsorUrl').should('be.empty');
        cy.testId('sponsorUrl').type('https://twitch3.tv');
        cy.testId('save').click();
      });
    });

    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Twitch 4
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.get('form').within(() => {
        cy.testId('sponsorImage').should('be.empty');
        cy.testId('sponsorImage').attachFile(fileName, { force: true });
        cy.testId('sponsorName').should('be.empty');
        cy.testId('sponsorName').type('Cypress Sponsor 4');
        cy.testId('sponsorUrl').should('be.empty');
        cy.testId('sponsorUrl').type('https://twitch4.tv');
        cy.testId('save').click();
      });
    });

    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Twitch 5
    cy.get('@dialog').within(() => {
      cy.testId('add').click();

      cy.get('form').within(() => {
        cy.testId('sponsorImage').should('be.empty');
        cy.testId('sponsorImage').attachFile(fileName, { force: true });
        cy.testId('sponsorName').should('be.empty');
        cy.testId('sponsorName').type('Cypress Sponsor 5');
        cy.testId('sponsorUrl').should('be.empty');
        cy.testId('sponsorUrl').type('https://twitch5.tv');
        cy.testId('save').click();
      });
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    cy.testId('add').should('be.disabled');

    // Delete 1
    cy.testId('sponsor-list').within(() => {
      cy.testId('sponsor').eq(0).click();
    });
    cy.get('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 2
    cy.testId('sponsor-list').within(() => {
      cy.testId('sponsor').eq(0).click();
    });
    cy.get('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 3
    cy.testId('sponsor-list').within(() => {
      cy.testId('sponsor').eq(0).click();
    });
    cy.get('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 4
    cy.testId('sponsor-list').within(() => {
      cy.testId('sponsor').eq(0).click();
    });
    cy.get('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 5
    cy.testId('sponsor-list').within(() => {
      cy.testId('sponsor').eq(0).click();
    });
    cy.get('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    cy.get('@dialog').within(() => {
      cy.get('p').should('have.text', 'No Sponsors yet.');
    });
  });
});
