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

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);

    // Información crea la tag    
    const title = faker.lorem.word().substring(0, 5);
    const slug = faker.lorem.word().substring(0, 5);
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

    // Verifica que el tag aparezca en el listado de tags - para ser Eliminado
    adminMenu.tagTab.click();
    tagSection.tagInList(title).click();
    cy.wait(2000);
    cy.get("button").contains("Delete tag").click();
    //tagSection.editorDeleteTagButton.click();   
    cy.wait(1000);
    //tagSection.modalDeleteTagButton.click();
    cy.wait(3000);    

    // Edita el titulo


    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el tag actualizado aparezca en el listado de tags

    // Cargar la URL en el explorador
    adminMenu.tagTab.click();
    let url;
    cy.url().then(($url) => {
        url = $url;
        cy.log(`La URL actual es: ${url}`);
        const newUrl = `${url}/${title}${slug}`;
        cy.log(`La nueva URL es: ${newUrl}`);
        cy.visit(newUrl);
        });

    cy.wait(5000);

  });
});
