import { faker } from "@faker-js/faker";

import TagSection from "../support/elements/tagSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Eliminar un tag y validación de la eliminación del tag.", () => {
  it("Eliminar un tag y validación de la eliminación del tag.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede editar tags
    cy.login();
    cy.wait(1000);
    cy.screenshot("P13.1 Login v4.44.0")

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("P13.2 Click tag v4.44.0")

    // Información crea la tag    
    const title = faker.lorem.word().substring(0, 5);
    const slug = faker.lorem.word().substring(0, 5);
    const content = faker.lorem.paragraphs(1);
    
    //Crea Tag a Editar
    tagSection.createTag(title, slug , content);
    cy.wait(1000);
    cy.screenshot("P13.3 Información tag v4.44.0")

    // Publica el tag
    tagSection.saveTag.click();
    cy.wait(1000);
    cy.screenshot("P13.4 Almacenar tag v4.44.0")
    /* 
    -------------
      WHEN
    -------------
    */

    // Verifica que el tag aparezca en el listado de tags - para ser Eliminado
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("P13.5 Click tag v4.44.0")
    tagSection.tagInList(title).click();
    cy.wait(1000);
    cy.screenshot("P13.6 Buscar tag v4.44.0")

    tagSection.editorDeletePostButton.click();
    cy.wait(1000);
    cy.screenshot("P13.7 selección borrar tag v4.44.0")
    tagSection.modalDeleteButton.click();    
    cy.wait(1000);
    cy.screenshot("P13.8 Borrar tag v4.44.0")

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica el tag no exista y se tenga un page not found
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("P13.9 Click tag v4.44.0")
    let url;
    cy.url().then(($url) => {url = $url;cy.log(`La URL actual es: ${url}`);
                              const newUrl = `${url}/${title}${slug}`;
                              cy.log(`La nueva URL es: ${newUrl}`);
                              cy.visit(newUrl);});

    cy.wait(5000);
    cy.screenshot("P13.10 Consulta tag que no existe v4.44.0")
    // Cargar la URL en el explorador
  });
});
