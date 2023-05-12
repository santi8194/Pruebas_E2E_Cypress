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
        cy.screenshot('P18.1 Login v4.44.0');
        // Design Ir a la pestaña Design
        adminMenu.designTab.click();
        cy.wait(1000);
        cy.then(() => {
            cy.screenshot('P18.2 Click_Design v4.44.0');
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
            cy.screenshot('P18.3 Create_Link v4.44.0');
        });
        // Guardar cambios
        designSection.saveButton.click();
        cy.wait(1000);
        cy.then(() => {
            cy.screenshot('P18.4 Save_Changes v4.44.0');
        });
        /*
-------------
THEN
-------------
*/
        // Verificar existencia de nuevo url
        designSection.verifyNewLabel;
        cy.screenshot('P18.5 Verify_New_Label v4.44.0');
    })
})