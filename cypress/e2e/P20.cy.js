import AdminMenu from "../support/elements/adminMenu";

const adminMenu = new AdminMenu();

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
    })
})