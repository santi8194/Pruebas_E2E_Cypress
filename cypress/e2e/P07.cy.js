import { faker } from "@faker-js/faker";
import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de una existente página en estado 'Borrador' y validación de disponibilidad en la aplicación.", () => {
  it("Publicación de una existente página en estado 'Borrador' y validación de disponibilidad en la aplicación.", () => {
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

    // Crea la página borrador
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);
    pageSection.goBackToPagesSection.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página borrador
    pageSection.pageInList(title).click();

    // Publica la página
    pageSection.publishPage();

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página aparezca en la lista de páginas con el estado "Published"
    pageSection.goBackToPagesSection.click();
    const page = pageSection.pageInList(title);
    page.contains("Published");
    page.click();

    // Verifica que la página aparezca visible en el sitio
    pageSection.editorSettingsButton.click();
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(title);
  });
});
