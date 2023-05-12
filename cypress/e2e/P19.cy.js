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
    cy.screenshot('P19.1 Login v4.44.0');
    cy.wait(10000);
    adminMenu.designTab.click();
    cy.wait(1000);

    // Crear link a editar
    cy.screenshot('P19.2 Click_Design v4.44.0');
    cy.wait(10000);
    designSection.createLink(labelValue);
    cy.wait(1000);

    // Guardar cambios
    cy.screenshot('P19.3 Create_Link v4.44.0');
    cy.wait(10000);
    designSection.saveButton.click();
    cy.wait(2000);

    // Recargar settings
    cy.screenshot('P19.4 Save_Changes v4.44.0');
    cy.wait(10000);
    cy.reload();

    /*
		-------------
		WHEN
		-------------
		*/

    // Editar el label creado
    cy.screenshot('P19.5 Reload v4.44.0');
    cy.wait(10000);
    designSection.editLastLabel(newValue);
    cy.screenshot('P19.6 Edit_Last_Label v4.44.0');
    cy.wait(10000);
    designSection.saveButton.click();
    cy.wait(1000);

    /*
		-------------
		THEN
		-------------
		*/

    // Recargar settings
    cy.screenshot('P19.7 Save_Changes v4.44.0');
    cy.wait(10000);
    cy.reload();

    // Verificar los cambios
    cy.screenshot('P19.8 Reload v4.44.0');
    designSection.navigationLabels.then((inputs) => {
      cy.wait(500);
      cy.wrap(inputs[inputs.length - 2])
        .invoke("val")
        .should("eq", newValue);
    });
    cy.screenshot('P19.9 Verify_Changes v4.44.0');
    cy.wait(10000);
  });
});
