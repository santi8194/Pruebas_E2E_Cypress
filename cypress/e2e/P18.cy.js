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
        cy.screenshot('P18.1 Login v3.41.1');
        // Design Ir a la pestaña Design
        adminMenu.designTab.click();
        cy.wait(1000);
        cy.then(() => {
            cy.screenshot('P18.2 Click_Design v3.41.1');
        });
        /*
-------------
WHEN
-------------
*/
        // Agregar Label AnotherHome con url http://localhost:2368/AnotherHome/
        designSection.createLink(label);
        cy.wait(1000);
        cy.then(() => {
            cy.screenshot('P18.3 Create_Link v3.41.1');
        });
        // Guardar cambios
        designSection.saveButton.click();
        cy.wait(1000);
        cy.then(() => {
            cy.screenshot('P18.4 Save_Changes v3.41.1');
        });
        /*
-------------
THEN
-------------
*/
        // Verificar existencia de nuevo url
        designSection.verifyNewLabel;
        cy.screenshot('P18.5 Verify_New_Label v3.41.1');
    })
})