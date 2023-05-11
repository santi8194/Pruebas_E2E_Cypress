import { faker } from "@faker-js/faker";
import PageSection from "../support/elements/pagesSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const version = Cypress.env("versionGhost");

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
    cy.screenshot(`P07.1 Login v${version}`);

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.screenshot(`P07.2 Ir a la pestaña Pages v${version}`);
    cy.wait(1000);

    // Crea la página borrador
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    pageSection.createPage(title, content);
    cy.screenshot(`P07.3 Crear página v${version}`);
    pageSection.goBackToPagesSection.click();
    cy.wait(1000);
    cy.screenshot(`P07.4 Ir a la lista de páginas v${version}`);

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona la página borrador
    pageSection.pageInList(title).click();
    cy.screenshot(`P07.5 Seleccionar la página v${version}`);

    // Publica la página
    pageSection.publishPage();
    cy.screenshot(`P07.6 Publicar página v${version}`);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que la página aparezca en la lista de páginas con el estado "Published"
    pageSection.goBackToPagesSection.click();
    const page = pageSection.pageInList(title);
    page.contains("Published");
    cy.screenshot(`P07.7 Página con el estado "Published" v${version}`);
    page.click();

    // Verifica que la página aparezca visible en el sitio
    pageSection.editorSettingsButton.click();
    cy.screenshot(`P07.8 Abrir settings v${version}`);
    pageSection.editorViewPage.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.pageTitle.contains(title);
    cy.screenshot(`P07.9 Página visible en sitio v${version}`);
  });
});
