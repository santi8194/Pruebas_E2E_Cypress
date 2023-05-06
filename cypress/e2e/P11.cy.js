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

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Información crea la tag
    const title = faker.lorem.lines(1);
    const slug = faker.internet.url();
    const content = faker.lorem.paragraphs(1);

    tagSection.createPage(title, slug , content);

    // Publica el tag
    tagSection.saveTag.click();
    /* 
    -------------
      THEN
    -------------
    */
   
    // Verifica que el tag aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.wait(5000);
    tagSection.pageInList(title).click();
  });
});
