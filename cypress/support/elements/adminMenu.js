export default class AdminMenu {
  get pageTab() {
    return cy.get("a").contains("Pages");
  }
  get staffTab() {
    return cy.get("a").contains("Staff");
  }
}
