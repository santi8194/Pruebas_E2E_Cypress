import { faker } from "@faker-js/faker";

import PostSection from "../support/elements/postsSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Eliminación de un post existente y validación de la no disponibilidad de el post en la aplicación.", () => {
  it("Eliminación de un post existente y validación de la no disponibilidad de el post en la aplicación..", () => {
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

    // Crea el post a eliminar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();

    // Obtenemos el link de el post
    postSection.editorSettingsButton.click();
    postSection.editorViewPost.then(($link) => {
      const href = $link.prop("href");
      cy.wrap(href).as("linkDeletedPost");
    });
    postSection.goBackToPostsSection.click({ force: true });

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post a eliminar
    postSection.postInList(title).click();

    // Elimina el post
    postSection.editorSettingsButton.click();
    postSection.editorDeletePostButton.click();
    cy.wait(1000);
    postSection.modalDeleteButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post no aparezca en la lista de posts
    postSection.notPostInList(title);

    // Verifica que el post no aparezca visible en el sitio
    cy.get("@linkDeletedPost").then((href) => {
      cy.visit(href, { failOnStatusCode: false });
      site.post404;
    });
  });
});
