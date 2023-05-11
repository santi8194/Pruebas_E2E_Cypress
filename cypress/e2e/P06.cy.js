import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const version = Cypress.env("versionGhost");

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de una página nueva y validación de disponibilidad en la aplicación.", () => {
  it("Publicación de una página nueva y validación de disponibilidad en la aplicación.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear páginas
    cy.login();
    cy.screenshot(`P06.1 Login v${version}`);

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.screenshot(`P06.2 Ir a la pestaña Pages v${version}`);
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Crea la página
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);

    cy.screenshot(`P06.3 Crear página v${version}`);

    // Publica la página
    pageSection.publishPage();
    cy.screenshot(`P06.4 Publicar página v${version}`);
    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página aparezca en la lista de páginas
    pageSection.goBackToPagesSection.click();
    cy.screenshot(`P06.5 Ir a la lista de páginas v${version}`);
    pageSection.pageInList(title).click();
    cy.screenshot(`P06.6 Seleccionar la página v${version}`);

    // Verifica que la página aparezca visible en el sitio
    pageSection.editorSettingsButton.click();
    cy.screenshot(`P06.7 Abrir settings v${version}`);
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(title);
    cy.screenshot(`P06.8 Página visible en sitio v${version}`);
  });
});
