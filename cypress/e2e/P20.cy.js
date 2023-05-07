import AdminMenu from "../support/elements/adminMenu";
import DesignSection from "../support/elements/designSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();
const labelValue = faker.word.noun();

describe("Eliminar link de navegación", () => {
  it("Elimina el link con el Label Help", () => {
    /*
  -------------
  GIVEN
  -------------
 */
    // Autenticar usuario
    cy.login();
    cy.wait(1000);
    // Ir a la pestaña Design
    adminMenu.designTab.click();
    cy.wait(1000);

    // Crear link a editar
    designSection.createLink(labelValue);
    cy.wait(1000);

    // Guardar cambios
    designSection.saveButton.click();
    cy.wait(2000);

    // Recargar settings
    cy.reload();

    /*
    -------------
    WHEN
    -------------
    */

    // Obtener el valor del ultimo input
    designSection.clickLastLabelDeleteButton;
    designSection.saveButton.click();

    /*
    -------------
    THEN
    -------------
    */
    // Recargar settings
    cy.reload();

    // Validar que se halla eliminado en último link
    designSection.validateDeletedLink(labelValue);
  });
});
