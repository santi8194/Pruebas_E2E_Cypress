import { faker } from "@faker-js/faker";

import PostSection from "../support/elements/postsSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición unicamente del cuerpo de un post existente y validación de cambios en la aplicación.", () => {
  it("Edición unicamente del cuerpo de un post existente y validación de cambios en la aplicación.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear posts
    cy.login();

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);

    // Crea el post a editar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();
    postSection.goBackToPostsSection.click();

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post a editar
    postSection.postInList(title).click();

    // Edita el cuerpo de un post
    const newContent = faker.lorem.paragraphs(1);
    postSection.editorContainerBody.clear().type(newContent);
    postSection.editorUpdateDropdown.click();
    postSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca visible en el sitio con el nuevo contenido
    postSection.editorSettingsButton.click();
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.postContent.contains(newContent);
  });
});
