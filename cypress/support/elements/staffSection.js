export default class StaffSection {
    
    get editorContainerPass() {
        return cy.get('#user-password-new');
    }
    
    get editorContainerNewPass() {
        return cy.get('#user-new-password-verification');
    }

    staffInList() {
        return cy
          .get(".apps-grid-cell.tooltip-centered")
          .filter(`:contains(Ghost)`)
          .first();
      }
      
      get changePass() {
        return cy.get("button").contains("Change Password");
        //return cy.get("a").contains("Change Password", {force: true});
      }      

      replacePass(newpass) {                
        this.editorContainerPass.type(newpass);
        this.editorContainerNewPass.type(newpass);        
      }

}