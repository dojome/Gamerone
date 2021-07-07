/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login as the default Cypress automated test user.
     */
    login(): Chainable<any>;

    /**
     * Login to the application using the provided email and password.
     *
     * @param email - email adress
     * @param password - password for the account
     */
    loginAs(email: string, password: string): Chainable<any>;

    /**
     * Waits for the loading/spinner to stop animating
     */
    waitForInputLoading(): Chainable<Element>;

    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.testId('greeting')
     */
    testId(value: string): Chainable<Element>;

    notify(): Chainable<Element>;

    notifyTitle(): Chainable<Element>;

    notifyMessage(): Chainable<Element>;

    /**
     * Saves the local storage between tests
     */
    saveLocalStorage(): Chainable<Element>;

    /**
     * Restores the saved local storage
     */
    restoreLocalStorage(): Chainable<Element>;
  }
}
