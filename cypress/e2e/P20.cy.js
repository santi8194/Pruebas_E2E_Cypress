import AdminMenu from "../support/elements/adminMenu";
import DesignSection from "../support/elements/designSection";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();


describe('Eliminar link de navegación', () => {
    it('Elimina el link con el Label Help', () => {
        /*
 -------------
 GIVEN
 -------------
 */
        // Autenticar usuario
        cy.login();
        cy.wait(10000);
        // Ir a la pestaña Design
        adminMenu.designTab.click();
        cy.wait(1000);
        /*
-------------
WHEN
-------------
*/
        // Obtener el valor del ultimo input
        designSection.clickHelpDeleteButton;
        designSection.saveButton.click();

    })
})