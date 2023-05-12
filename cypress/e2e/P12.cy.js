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
    cy.wait(1000);
    cy.screenshot("P12.1 Login v4.44.0")

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);    
    cy.screenshot("P12.2 Click tag v4.44.0")

    // Información crea la tag
    const title = faker.lorem.lines(1);
    const slug = faker.internet.url();
    const content = faker.lorem.paragraphs(1);
    
    //Crea Tag a Editar
    tagSection.createTag(title, slug , content);
    cy.wait(1000);    
    cy.screenshot("P12.3 Información tag v4.44.0")

    // Publica el tag
    tagSection.saveTag.click();
    cy.wait(1000);    
    cy.screenshot("P12.4 Crear tag v4.44.0")

    /* 
    -------------
      WHEN
    -------------
    */

    // Verifica que el tag aparezca en el listado de tags - para ser editado
    adminMenu.tagTab.click();
    cy.wait(1000);    
    cy.screenshot("P12.5 Click tag v4.44.0")
    tagSection.tagInList(title).click();
    cy.wait(1000);    
    cy.screenshot("P12.6 Buscar tag v4.44.0")

    // Edita el titulo
    const newTitle = faker.lorem.lines(1);
    tagSection.updateTag(newTitle);
    cy.wait(1000);    
    cy.screenshot("P12.7 Actualizar titulo tag v4.44.0")
    tagSection.saveTag.click();
    cy.wait(1000);    
    cy.screenshot("P12.8 Almacenar tag v4.44.0")

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el tag actualizado aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("P12.9 Click tag v4.44.0")
    tagSection.tagInList(newTitle).click();
    cy.wait(1000);    
    cy.screenshot("P12.10 Buscar tag v4.44.0")
  });
});
