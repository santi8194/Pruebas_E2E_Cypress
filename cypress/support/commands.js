import LoginPage from "./elements/loginPage";

const username = Cypress.env("username");
const password = Cypress.env("password");
const baseUrl = Cypress.config("baseUrl");
const loginPage = new LoginPage();

// Autenticación

Cypress.Commands.add("login", () => {
  cy.visit(baseUrl);
  const usernameInput = loginPage.usernameInput
  if (usernameInput) {
    loginPage.login(username, password);
  }
  cy.wait(1000);
});
