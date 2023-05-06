import AdminMenu from "../support/elements/adminMenu";

const adminMenu = new AdminMenu();

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
    })
})