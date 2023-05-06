export default class Site {
  get pageTitle() {
    return cy.get("h1.post-full-title");
  }

  get postTitle() {
    return cy.get("h1.post-full-title");
  }

  get pageContent() {
    return cy.get("section.post-full-content");
  }

  get page404() {
    return cy.get("h1").contains("404");
  }
}
