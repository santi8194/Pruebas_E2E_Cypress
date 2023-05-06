export default class AdminMenu {
  get pageTab() {
    return cy.get("a").contains("Pages");
  }

  get tagTab() {
    return cy.get("a").contains("Tags");
  }

}
