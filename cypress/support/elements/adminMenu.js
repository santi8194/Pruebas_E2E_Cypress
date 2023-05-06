export default class AdminMenu {
  get pageTab() {
    return cy.get("a").contains("Pages");
  }

  get postTab() {
    return cy.get("a").contains("Posts");
  }

  get tagTab() {
    return cy.get("a").contains("Tags");
  }

}
