import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

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

    // Edita el cuerpo de una página
    const newContent = faker.lorem.paragraphs(1);
    pageSection.editorContainerBody.clear().type(newContent);
    pageSection.editorUpdateDropdown.click();
    pageSection.editorUpdateButton.click();
    cy.wait(3000);

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
  });
});
