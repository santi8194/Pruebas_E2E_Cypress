import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

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

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.wait(1000);

    // Crea la página a eliminar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);

    // Publica la página
    pageSection.publishPage();

    // Obtenemos el link de la página
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.then(($link) => {
      const href = $link.prop("href");
      cy.wrap(href).as("linkDeletedPage");
    });
    pageSection.goBackToPagesSection.click({ force: true });

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página a eliminar
    pageSection.pageInList(title).click();

    // Elimina la página
    pageSection.editorSettingsButton.click();
    pageSection.editorDeletePageButton.click();
    cy.wait(1000);
    pageSection.modalDeleteButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página no aparezca en la lista de páginas
    pageSection.notPageInList(title);

    // Verifica que la página no aparezca visible en el sitio
    cy.get("@linkDeletedPage").then((href) => {
      cy.visit(href, { failOnStatusCode: false });
      site.page404;
    });
  });
});
