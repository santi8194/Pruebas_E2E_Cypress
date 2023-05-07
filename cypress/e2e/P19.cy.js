import AdminMenu from "../support/elements/adminMenu";
import DesignSection from "../support/elements/designSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();
const newValue = faker.word.noun();

describe("Editar únicamente el label de un link y verificar el cambio.", () => {
  it("Editar únicamente el label de un link y verificar el cambio.", () => {
    /*
-------------
GIVEN
-------------
*/
    // Autenticar usuario
    cy.login();
    cy.wait(1000);
    // Design Ir a la pestaña Design
    adminMenu.designTab.click();
    cy.wait(1000);
    /*
-------------
WHEN
-------------
*/
    // Editar el label del primer link
    designSection.editFirstLabel(newValue);
    designSection.saveButton.click();
    cy.wait(1000);
    /*
-------------
THEN
-------------
*/
    // Recargar settings
    cy.reload();
    // Verificar los cambios
    designSection.navigationLabels.then((inputs) => {
      cy.wait(500);
      cy.wrap(inputs[0]).invoke("val").should("eq", newValue);
    });
  });
});
