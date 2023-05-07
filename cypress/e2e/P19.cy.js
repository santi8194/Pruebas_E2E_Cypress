import AdminMenu from "../support/elements/adminMenu";
import DesignSection from "../support/elements/designSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();
const labelValue = faker.word.noun();
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

    // Editar el label creado
    designSection.editLastLabel(newValue);
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
      cy.wrap(inputs[inputs.length - 2])
        .invoke("val")
        .should("eq", newValue);
    });
  });
});
