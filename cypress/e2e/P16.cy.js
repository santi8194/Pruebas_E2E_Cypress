import AdminMenu from "../support/elements/adminMenu";
import StaffSection from "../support/elements/staffSection";

const adminMenu= new AdminMenu();
const staffSection = new StaffSection();

describe("Editar usuario para quitar suspensión.", () => {
    it("Editar usuario para quitar suspensión.", () => {
        /*
    -------------
      GIVEN
    -------------
    */
        // Autenticar usuario
        cy.login();
        // Ir a la pestaña Staff
        adminMenu.staffTab.click();
        cy.wait(1000);
        // Clic en usuario Ghost
        staffSection.ghostStaffMember.click();
        cy.wait(1000);
        // Clic en lista desplegable de ajustes
        staffSection.staffProfileConfiguration.click({force: true});
        // Suspender usuario
        staffSection.clickInSuspendStaffMember.click();
        cy.wait(1000);
        staffSection.suspendStaffMember.click();
        cy.wait(1000);
        // Volver a la pestaña Staff
        adminMenu.staffTab.click();
        cy.wait(1000);
    })
})