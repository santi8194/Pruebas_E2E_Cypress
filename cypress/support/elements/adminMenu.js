export default class AdminMenu {
  get pageTab() {
    return cy.get("a").contains("Pages");
  }
  
  get staffTab() {
    return cy.get("a").contains("Staff");
  }

  get postTab() {
    return cy.get("a").contains("Posts");
  }

  get tagTab() {
    return cy.get("a").contains("Tags");
  }

<<<<<<< HEAD
=======
  get staffTab() {
    return cy.get("a").contains("Staff");
  }
>>>>>>> feature/P14

}
