import { faker } from "@faker-js/faker";

import TagSection from "../support/elements/tagSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Creación de un tag y validación de la creación del tag.", () => {
  it("Creación de un tag y validación de la creación del tag.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear tags    
    cy.login();
    cy.wait(1000);
    cy.screenshot("16.1 Login v3.41")

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("16.2 Click Tag v3.41")
    /* 
    -------------
      WHEN
    -------------
    */

    // Información crea la tag
    const title = faker.lorem.lines(1);
    const slug = faker.internet.url();
    const content = faker.lorem.paragraphs(1);

    tagSection.createTag(title, slug , content);
    cy.wait(1000);
    cy.screenshot("16.3 Agregar info tag v3.41")

    // Publica el tag
    tagSection.saveTag.click();
    cy.wait(1000);
    cy.screenshot("16.4 Guarda tag v3.41")
    /* 
    -------------
      THEN
    -------------
    */
   
    // Verifica que el tag aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("16.5 Click Tag v3.41")
    tagSection.tagInList(title).click();
    cy.screenshot("16.6 Busca Tag v3.41")
    cy.wait(2000);
  });
});
