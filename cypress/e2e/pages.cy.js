const baseUrl = Cypress.config("baseUrl");

describe("template spec", () => {
  it("passes", () => {
    cy.visit(baseUrl);
  });
});