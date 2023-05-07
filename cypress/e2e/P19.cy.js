import AdminMenu from "../support/elements/adminMenu";
import DesignSection from "../support/elements/designSection";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();
const addedname = 'Editado';
const editResult = 'Author' + addedname;

describe('Editar link de navegación', () => {
    it('Edita el link con el label author', () => {
        /*
-------------
GIVEN
-------------
*/
        // Autenticar usuario
        cy.login();
        cy.wait(10000);
        // Design Ir a la pestaña Design
        adminMenu.designTab.click();
        cy.wait(1000);
        /*
-------------
WHEN
-------------
*/
        // Editar Link the autor
       designSection.editLabel(addedname);
       designSection.saveButton.click();
       cy.wait(10000);
        /*
-------------
THEN
-------------
*/
        //Verificar los cambios
    })
})