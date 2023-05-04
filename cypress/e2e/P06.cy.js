import { faker } from "@faker-js/faker";

import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

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
    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Crea la página

    pageSection.newPageButton.click();
    cy.wait(1000);
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);
    pageSection.editorContainerTitle.type(title);
    pageSection.editorContainerBody.type(content);
    pageSection.editorPublishDropdown.click();
    pageSection.editorPublishButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página aparezca en la lista de páginas
    pageSection.goBackToPagesSection.click();
    pageSection.pageInList(title).click();

    // Verifica que la página aparezca visible en el sitio
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(title);
  });
});
