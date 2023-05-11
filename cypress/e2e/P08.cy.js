import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const version = Cypress.env("versionGhost");

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición unicamente del cuerpo de una página existente y validación de cambios en la aplicación.", () => {
  it("Edición unicamente del cuerpo de una página existente y validación de cambios en la aplicación.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear páginas
    cy.login();
    cy.screenshot(`P08.1 Login v${version}`);

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.wait(1000);
    cy.screenshot(`P08.2 Ir a la pestaña Pages v${version}`);

    // Crea la página a editar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);
    cy.screenshot(`P08.3 Crear página v${version}`);

    // Publica la página
    pageSection.publishPage();
    cy.screenshot(`P08.4 Publicar página v${version}`);
    pageSection.goBackToPagesSection.click();
    cy.screenshot(`P08.5 Ir a la lista de páginas v${version}`);

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página a editar
    pageSection.pageInList(title).click();
    cy.screenshot(`P08.6 Seleccionar la página v${version}`);

    // Edita el cuerpo de una página
    const newContent = faker.lorem.paragraphs(1);
    pageSection.editorContainerBody.clear().type(newContent);
    cy.screenshot(`P08.7 Editar cuerpo página v${version}`);
    pageSection.editorUpdateDropdown.click();
    pageSection.editorUpdateButton.click();
    cy.wait(3000);
    cy.screenshot(`P08.8 Actualizar página v${version}`);
    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página aparezca visible en el sitio con el nuevo contenido
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageContent.contains(newContent);
    cy.screenshot(`P08.9 Edición visible en sitio v${version}`);
  });
});
