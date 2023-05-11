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
    cy.screenshot("13.1 Login v3.41")

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("13.2 Click tag v3.41")

    // Información crea la tag    
    const title = faker.lorem.word().substring(0, 5);
    const slug = faker.lorem.word().substring(0, 5);
    const content = faker.lorem.paragraphs(1);
    
    //Crea Tag a Editar
    tagSection.createTag(title, slug , content);
    cy.wait(1000);
    cy.screenshot("13.3 Información tag v3.41")

    // Publica el tag
    tagSection.saveTag.click();
    cy.wait(1000);
    cy.screenshot("13.4 Almacenar tag v3.41")
    /* 
    -------------
      WHEN
    -------------
    */

    // Verifica que el tag aparezca en el listado de tags - para ser Eliminado
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("13.5 Click tag v3.41")
    tagSection.tagInList(title).click();
    cy.wait(1000);
    cy.screenshot("13.6 Buscar tag v3.41")

    tagSection.editorDeletePostButton.click();
    cy.wait(1000);
    cy.screenshot("13.7 selección borrar tag v3.41")
    tagSection.modalDeleteButton.click();    
    cy.wait(1000);
    cy.screenshot("13.8 Borrar tag v3.41")

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica el tag no exista y se tenga un page not found
    adminMenu.tagTab.click();
    cy.wait(1000);
    cy.screenshot("13.9 Click tag v3.41")
    let url;
    cy.url().then(($url) => {url = $url;cy.log(`La URL actual es: ${url}`);
                              const newUrl = `${url}/${title}${slug}`;
                              cy.log(`La nueva URL es: ${newUrl}`);
                              cy.visit(newUrl);});

    cy.wait(5000);
    cy.screenshot("13.10 Consulta tag que no existe v3.41")
    // Cargar la URL en el explorador
  });
});
