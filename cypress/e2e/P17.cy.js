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
        // Ir a la pestaña Staff
        adminMenu.staffTab.click();
        cy.wait(1000);
        // Seleccionar usuario de Ghost
        staffSection.ghostStaffMember.click();
        cy.wait(1000);
        /*
    -------------
      WHEN
    -------------
    */
        // Dar clic en el desplegable de Roles y seleccionar 'Contributor'
        staffSection.obtainRoleOptions.select('Contributor');
        cy.wait(1000)
        // Guardar Cambios
        staffSection.saveChanges.click();
        /*
    -------------
      THEN
    -------------
    */
        // Verificar el cambio del rol
        cy.wait(1000)
        staffSection.verifyChangedRole;
    })
})