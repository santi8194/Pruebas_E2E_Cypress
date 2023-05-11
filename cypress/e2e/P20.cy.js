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
    cy.screenshot("P20.1 Login v3.41.1");
    // Ir a la pestaña Design
    adminMenu.designTab.click();
    cy.wait(1000);
    cy.screenshot("P20.2 Click_Design v3.41.1");

    // Crear link a editar
    designSection.createLink(labelValue);
    cy.wait(1000);
    cy.screenshot("P20.3 Create_Link v3.41.1");

    // Guardar cambios
    designSection.saveButton.click();
    cy.wait(2000);
    cy.screenshot("P20.4 Save_Changes v3.41.1");

    // Recargar settings
    cy.reload();
    cy.screenshot("P20.5 Reload v3.41.1");

    /*
    -------------
    WHEN
    -------------
    */

    // Obtener el valor del ultimo input
    designSection.clickLastLabelDeleteButton;
    cy.screenshot("P20.6 Click_Last_Label_Delete_Button v3.41.1");
    designSection.saveButton.click();
    cy.screenshot("P20.7 Save_Changes v3.41.1");

    /*
    -------------
    THEN
    -------------
    */
    // Recargar settings
    cy.reload();
    cy.screenshot("P20.8 Reload v3.41.1");

    // Validar que se halla eliminado en último link
    designSection.validateDeletedLink(labelValue);
    cy.screenshot("P20.9 Validate_Deleted_Link v3.41.1");
  });
});
