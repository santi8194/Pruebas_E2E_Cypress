import { faker } from "@faker-js/faker";

import TagSection from "../support/elements/tagSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición de titulo en tag y validación de la Edición del tag.", () => {
  it("Edición de titulo en tag y validación de la Edición del tag.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede editar tags
    cy.login();

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);

    // Información crea la tag
    const title = faker.lorem.lines(1);
    const slug = faker.internet.url();
    const content = faker.lorem.paragraphs(1);
    
    //Crea Tag a Editar
    tagSection.createTag(title, slug , content);

    // Publica el tag
    tagSection.saveTag.click();

    /* 
    -------------
      WHEN
    -------------
    */

    // Verifica que el tag aparezca en el listado de tags - para ser editado
    adminMenu.tagTab.click();
    cy.wait(1000);
    tagSection.tagInList(title).click();
    cy.wait(2000);

    // Edita el titulo
    const newTitle = faker.lorem.lines(1);
    tagSection.updateTag(newTitle);
    tagSection.saveTag.click();
    cy.wait(2000);

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el tag actualizado aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    tagSection.tagInList(newTitle).click();
    cy.wait(2000);
  });
});
