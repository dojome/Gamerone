// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import 'cypress-file-upload';

// -- This is a parent command --
Cypress.Commands.add('login', () => {
  const EMAIL = 'cypress@gamerone.gg';
  const PASSWORD = 'ZEwB!C4sq@zkkhE77beFCpiBUT';
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      email: EMAIL,
      password: PASSWORD,
    },
  }).then((res) => {
    window.localStorage.setItem('id_token', res.body.token);
  });
});

Cypress.Commands.add('loginAs', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://api-stage.g1.gg/login',
    body: {
      email: email,
      password: password,
    },
  }).then((res) => {
    window.localStorage.setItem('id_token', res.body.token);
  });
});

Cypress.Commands.add('testId', (value) => {
  return cy.get(`[data-testid=${value}]`);
});

Cypress.Commands.add('notify', () => {
  return cy.get(`[role="alert"]`);
});

Cypress.Commands.add('notifyTitle', () => {
  return cy.get(`[role="alert"] h3`);
});

Cypress.Commands.add('notifyMessage', () => {
  return cy.get(`[role="alert"] p`);
});

Cypress.Commands.add('waitForInputLoading', () => {
  cy.get('[data-testid=input-loading]').should('not.exist');
});

const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  console.log('LOCAL_STORAGE_MEMORY is: ', LOCAL_STORAGE_MEMORY);
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
  console.log('restoreLocalStorage Finished populating ');
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  // cy.wait(1000);
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
