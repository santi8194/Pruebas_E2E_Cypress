import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const version = Cypress.env("versionGhost");

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Eliminación de una página existente y validación de la no disponibilidad de la página en la aplicación.", () => {
  it("Eliminación de una página existente y validación de la no disponibilidad de la página en la aplicación..", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear páginas
    cy.login();
    cy.screenshot(`P10.1 Login v${version}`);

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.wait(1000);
    cy.screenshot(`P10.2 Ir a la pestaña Pages v${version}`);

    // Crea la página a eliminar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);
    cy.screenshot(`P10.3 Crear página v${version}`);

    // Publica la página
    pageSection.publishPage();
    cy.screenshot(`P10.4 Publicar página v${version}`);

    // Obtenemos el link de la página
    pageSection.editorSettingsButton.click();
    cy.screenshot(`P10.5 Abrir settings v${version}`);
    pageSection.editorViewPage.then(($link) => {
      const href = $link.prop("href");
      cy.wrap(href).as("linkDeletedPage");
    });
    pageSection.goBackToPagesSection.click({ force: true });
    cy.screenshot(`P10.6 Ir a la lista de páginas v${version}`);

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página a eliminar
    pageSection.pageInList(title).click();
    cy.screenshot(`P10.7 Seleccionar la página v${version}`);

    // Elimina la página
    pageSection.editorSettingsButton.click();
    pageSection.editorDeletePageButton.click();
    cy.wait(1000);
    cy.screenshot(`P10.8 Eliminar página v${version}`);

    pageSection.modalDeleteButton.click();
    cy.wait(3000);
    cy.screenshot(`P10.9 Confirmar eliminar página v${version}`);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página no aparezca en la lista de páginas
    pageSection.notPageInList(title);
    cy.screenshot(`P10.10 Ir a la lista de páginas v${version}`);

    // Verifica que la página no aparezca visible en el sitio
    cy.get("@linkDeletedPage").then((href) => {
      cy.visit(href, { failOnStatusCode: false });
      site.page404;
    });

    cy.screenshot(`P10.11 Página no debe existir en el sitio v${version}`);
  });
});
