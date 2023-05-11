import AdminMenu from "../support/elements/adminMenu";
import StaffSection from "../support/elements/staffSection";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();

describe("Cambiar rol de usuario", () => {
    it("Cambia el rol del usuario por defecto de Author a Contributor", () => {
        /*
-------------
  GIVEN
-------------
*/
        // Autenticar usuario
        cy.login();
        cy.screenshot('P17.1 Login v3.41.1');
        // Ir a la pestaña Staff
        adminMenu.staffTab.click();
        cy.screenshot('P17.2 Click_Staff v3.41.1');
        cy.wait(1000);
        // Seleccionar usuario de Ghost
        staffSection.ghostStaffMember.click();
        cy.screenshot('P17.3 Click_Ghost v3.41.1');
        cy.wait(1000);
        /*
    -------------
      WHEN
    -------------
    */
        // Dar clic en el desplegable de Roles y seleccionar 'Contributor'
        staffSection.obtainRoleOptions.select('Contributor');
        cy.screenshot('P17.4 Select_Contributor v3.41.1');
        cy.wait(1000)
        // Guardar Cambios
        staffSection.saveChanges.click();
        cy.screenshot('P17.5 Save_Changes v3.41.1');
        /*
    -------------
      THEN
    -------------
    */
        // Verificar el cambio del rol
        cy.wait(1000)
        staffSection.verifyChangedRole;
        cy.screenshot('P17.6 Verify_Changed_Role v3.41.1');
    })
})