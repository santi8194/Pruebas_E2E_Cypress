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
}