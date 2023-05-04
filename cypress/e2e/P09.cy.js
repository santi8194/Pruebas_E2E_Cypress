import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del título de una página existente y validación de cambios en la aplicación.", () => {
  it("Edición del título de una página existente y validación de cambios en la aplicación.", () => {
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

    // Crea la página a editar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);

    // Publica la página
    pageSection.publishPage();
    pageSection.goBackToPagesSection.click();

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página a editar
    pageSection.pageInList(title).click();

    // Edita el titulo
    const newTitle = faker.lorem.lines(1);
    pageSection.editorContainerTitle.clear().type(newTitle);
    pageSection.editorUpdateDropdown.click();
    pageSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página aparezca en la lista de páginas con el nuevo título
    pageSection.goBackToPagesSection.click();
    pageSection.pageInList(newTitle).click();

    // Verifica que la página aparezca visible en el sitio con el nuevo título
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(newTitle);
  });
});
