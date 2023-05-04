export default class Site {
  get pageTitle() {
    return cy.get("h1.post-full-title");
  }
}
