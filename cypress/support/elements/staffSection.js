export default class StaffSection {
    get ghostStaffMember() {
        return cy.get("h3").contains("Ghost");
    }
    get staffProfileConfiguration() {
        return cy.get("button").contains("User Settings");
    }
    get clickInSuspendStaffMember() {
        return cy.get("button").contains("Suspend User");
    }
    get suspendStaffMember() {
        return cy.get("button").contains("Suspend");
    }
    get ClickInUnSuspendStaffMember() {
        return cy.get("button").contains("Un-suspend User")
    }
    get unSuspendStaffMember() {
        return cy.get("button").contains("Un-suspend");
    }
    get verifyUnsuspendedMember() {
        return cy
            .get("span")
            .contains("Suspended")
            .should("not.exist");
    }
    get obtainRoleOptions() {
        return cy.get('select#new-user-role');
    }
    get saveChanges() {
        return cy.get('span').contains('Save');
    }
    get verifyChangedRole() {
        return cy.get('#new-user-role')
            .should('contain', 'Contributor');
    }

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