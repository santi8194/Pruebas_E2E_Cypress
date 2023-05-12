const version = Cypress.env("versionGhost");
export default class Site {
  get pageTitle() {
    if (version === "4.44.0") {
      return cy.get("h1.article-title");
    } else {
    return cy.get("h1.post-full-title");
    }
  }

  get postTitle() {
    if (version === "4.44.0") {
      return cy.get("h1.article-title");
    } else {
      return cy.get("h1.post-full-title");
    }
  }

  get pageContent() {
    if (version === "4.44.0") {
      return cy.get("section.gh-content > p");
    } else {
    return cy.get("section.post-full-content");
    }
  }

  get postContent() {
    if (version === "4.44.0") {
      return cy.get("section.gh-content");
    } else {
      return cy.get("section.post-full-content");
    }
  }

  get page404() {
    return cy.get("h1").contains("404");
  }
}
