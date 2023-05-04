const username = Cypress.env("username");
const password = Cypress.env("password");
const baseUrl = Cypress.config("baseUrl");

// Autenticación

Cypress.Commands.add("login", () => {
  cy.visit(baseUrl);
  cy.get("input[name='identification']").type(username);
  cy.get("input[name='password']").type(password);
  cy.get("button[type='submit']").click();
  cy.wait(1000);
});
