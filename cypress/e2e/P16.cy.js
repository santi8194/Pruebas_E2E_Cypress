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
        cy.screenshot('P16.1 Login v3.41.1');
        // Ir a la pestaña Staff
        adminMenu.staffTab.click();
        cy.screenshot('P16.2 Click_Staff v3.41.1');
        cy.wait(1000);

        // Clic en usuario Ghost
        staffSection.ghostStaffMember.click();
        cy.screenshot('P16.3 Click_Ghost v3.41.1');
        cy.wait(1000);
        // Clic en lista desplegable de ajustes
        staffSection.staffProfileConfiguration.click({force: true});
        cy.wait(500);
        cy.screenshot('P16.4 Click_Configuration v3.41.1');
        // Suspender usuario
        staffSection.clickInSuspendStaffMember.click();
        cy.wait(1000);
        cy.screenshot('P16.5 Click_Suspend v3.41.1');
        staffSection.suspendStaffMember.click();
        cy.screenshot('P16.6 Suspend_Member v3.41.1');
        cy.wait(1000);
        // Volver a la pestaña Staff
        cy.screenshot('P16.7 Click_Staff v3.41.1');
        adminMenu.staffTab.click();
        cy.wait(1000);

        /*
    -------------
      WHEN
    -------------
    */
        // Volver a dar clic en el usuario Ghost (suspendido)
        staffSection.ghostStaffMember.click();
        cy.wait(1000);
        cy.screenshot('P16.8 Click_Ghost v3.41.1');
        // Clic en la lista desplegable de ajustes.
        staffSection.staffProfileConfiguration.click({force: true});
        cy.screenshot('P16.9 Click_Configuration v3.41.1');
        // Quitar suspensión de usuario
        staffSection.ClickInUnSuspendStaffMember.click();
        cy.wait(500);
        cy.screenshot('P16.10 Click_Unsuspend v3.41.1');
        cy.wait(1000);
        staffSection.unSuspendStaffMember.click();
        cy.screenshot('P16.11 UnSuspend_Member v3.41.1');
        /*
    -------------
      THEN
    -------------
    */
        //Verificar que usuario esté activo
        cy.wait(1000);
        staffSection.verifyUnsuspendedMember;
        cy.screenshot('P16.12 Verify_Unsuspended_Member v3.41.1');
    })
})