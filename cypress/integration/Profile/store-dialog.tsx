/// <reference types="cypress" />
/// <reference types="../../support" />

context('Store - Dialog', () => {
  const fileName = 'product-small.jpg';

  const successTitle = 'Success';
  const successAddMessage = 'Product added successfully.';
  const successUpdateMessage = 'Product updated successfully.';
  const successDeleteMessage = 'Product deleted successfully.';

  beforeEach(() => {
    cy.login();
    cy.visit('/cypress-test');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(900); // so animation can finish

    cy.testId('card-store').within(() => {
      cy.testId('card-edit').click();
    });

    // aliases
    cy.testId('store-settings-dialog').as('dialog');
  });

  it('should open edit modal', () => {
    cy.get('@dialog').should('exist');
  });

  it('should have title store', () => {
    cy.get('@dialog').within(() => {
      cy.get('h4').should('have.text', 'Store');
    });
  });

  it('should have no products', () => {
    cy.get('@dialog').within(() => {
      cy.get('p').should('have.text', 'No Products yet.');
    });
  });

  it('should have add button and be enabled', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').should('be.enabled');
      cy.testId('add').should('have.text', 'Add Product');
    });
  });

  it('should show form', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').should('be.visible');
  });

  it('should have field labels', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      cy.testId('productImage').should('exist');
      cy.testId('name-label').should('have.text', 'Name');
      cy.testId('link-label').should('have.text', 'Product URL');
    });
  });

  it('should have buttons', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
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
    });

    cy.testId('form').within(() => {
      cy.testId('cancel').click();
    });
    cy.testId('form').should('not.exist');
  });

  it('name field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      // maxLength of 40
      cy.testId('name').should('have.attr', 'maxlength').and('eq', '40');

      // required
      cy.testId('name').focus().blur();
      cy.testId('name-error').should('exist');
      cy.testId('name-error').should('have.text', 'Required');

      // minLength of 3
      cy.testId('name').focus().type('cy').blur();
      cy.testId('name-error').should('exist');
      cy.testId('name-error').should(
        'have.text',
        'Must be at least 3 characters long.',
      );
    });
  });

  it('website url field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    cy.testId('form').within(() => {
      // maxLength of 255
      cy.testId('link').should('have.attr', 'maxlength').and('eq', '255');

      // required
      cy.testId('link').clear();
      cy.testId('link').focus().blur();
      cy.testId('link-error').should('exist');
      cy.testId('link-error').should('have.text', 'Required');

      // url pattern test
      cy.testId('link').clear().type('gamerone').blur();
      cy.testId('link-error').should('exist');
      cy.testId('link-error').should(
        'have.text',
        'URL format is incorrect. Must start with https:// or yourdomain.',
      );

      // url pattern test
      cy.testId('link').clear().type('http:gamerone.gg').blur();
      cy.testId('link-error').should('exist');
      cy.testId('link-error').should(
        'have.text',
        'URL format is incorrect. Must start with https:// or yourdomain.',
      );

      // url pattern test
      cy.testId('link').clear().type('http://gamerone.gg').blur();
      cy.testId('link-error').should('not.exist');

      // url pattern test
      cy.testId('link').clear().type('https://gamerone.gg').blur();
      cy.testId('link-error').should('not.exist');

      // url pattern test
      cy.testId('link')
        .clear()
        .type(
          'https://steelseries.com/gaming-headsets/arctis-pro-wireless?color=black',
        )
        .blur();
      cy.testId('link-error').should('not.exist');
    });
  });

  it('image field validation', () => {
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });

    // required
    cy.testId('form').within(() => {
      cy.testId('name').type('Cypress Sponsor');
      cy.testId('save').click();
      cy.testId('productImage-error').should('exist');
      cy.testId('productImage-error').should('have.text', 'Image is required.');
    });
  });

  it('should add and delete one product', () => {
    // Product
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 1');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);

    // delete sponsor
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should add, update and delete one product', () => {
    // Product
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 1');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successAddMessage);
    cy.notify().should('not.exist');

    // update product
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });

    cy.testId('form').within(() => {
      cy.testId('name').type(' Updated');
      cy.testId('save').click();
    });

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successUpdateMessage);
    cy.notify().should('not.exist');

    // delete sponsor
    cy.testId('product-list').within(() => {
      // cy.testId('product')
      //   .eq(0)
      //   .get('h3')
      //   .should('have.text', 'Cypress Product 1 Updated');
      cy.testId('product').eq(0).click();
    });
    cy.testId('delete').click();

    // check toast message
    cy.notify().should('exist');
    cy.notifyTitle().should('have.text', successTitle);
    cy.notifyMessage().should('have.text', successDeleteMessage);
  });

  it('should have max of five products', () => {
    // Product 1
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 1');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Product 2
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 2');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Product 3
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 3');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Product 4
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 4');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Product 5
    cy.get('@dialog').within(() => {
      cy.testId('add').click();
    });
    cy.testId('form').within(() => {
      cy.testId('productImage').should('be.empty');
      cy.testId('productImage').attachFile(fileName, { force: true });
      cy.testId('name').should('be.empty');
      cy.testId('name').type('Cypress Product 5');
      cy.testId('link').should('be.empty');
      cy.testId('link').type(
        'https://store.teamliquid.com/collections/new-arrivals/products/liquid-script-facemask?variant=31761459085406',
      );
      cy.testId('save').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    cy.get('@dialog').within(() => {
      cy.testId('add').should('be.disabled');
    });

    // Delete 1
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 2
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 3
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 4
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });
    cy.testId('delete').click();
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    // Delete 5
    cy.testId('product-list').within(() => {
      cy.testId('product').eq(0).click();
    });
    cy.testId('form').within(() => {
      cy.testId('delete').click();
    });
    cy.notify().should('exist');
    cy.notify().should('not.exist');

    cy.get('@dialog').within(() => {
      cy.get('p').should('have.text', 'No Products yet.');
    });
  });
});
