import AdminMenu from "../support/elements/adminMenu";
import DesignSection from "../support/elements/designSection";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();
const label = 'AnotherHome';

describe('Agregar link de navegación', () => {
    it('Agregar un nuevo link de navegación con Label AnotherHome', () => {
        /*
-------------
GIVEN
-------------
*/
        // Autenticar usuario
        cy.login();
        // Design Ir a la pestaña Design
        adminMenu.designTab.click();
        cy.wait(1000);
        /*
-------------
WHEN
-------------
*/
        // Agregar Label AnotherHome con url http://localhost:2368/AnotherHome/
        designSection.createLink(label);
        cy.wait(1000);
        // Guardar cambios
        designSection.saveButton.click();
        cy.wait(2000);
        /*
-------------
THEN
-------------
*/
        // Verificar existencia de nuevo url
        designSection.verifyNewLabel;
    })
})