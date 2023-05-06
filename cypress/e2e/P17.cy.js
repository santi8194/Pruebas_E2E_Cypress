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
    })
})