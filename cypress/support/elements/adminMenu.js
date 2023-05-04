export default class AdminMenu {
  get pageTab() {
    return cy.get("a").contains("Pages");
  }
}
