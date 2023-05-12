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
    cy.screenshot('P05.1 Login v4.44.0');

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);
    cy.screenshot('P05.2 Click_Post v4.44.0');

    // Crea el post a eliminar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);
    cy.screenshot('P05.3 Create_Post v4.44.0');

    // Publica el post
    postSection.publishPost();
    cy.screenshot('P05.4 Publish_Post v4.44.0');

    // Obtenemos el link de el post
    postSection.editorSettingsButton.click();
    cy.screenshot('P05.5 Click_Post_Settings v4.44.0');
    postSection.editorViewPost.then(($link) => {
      const href = $link.prop("href");
      cy.wrap(href).as("linkDeletedPost");
    });
    postSection.goBackToPostsSection.click({ force: true });
    cy.screenshot('P05.6 Back_To_Post v4.44.0');

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post a eliminar
    postSection.postInList(title).click();
    cy.screenshot('P05.7 Click_New_Post v4.44.0');

    // Elimina el post
    postSection.editorSettingsButton.click();
    cy.screenshot('P05.8 Click_Post_Settings v4.44.0');
    postSection.editorDeletePostButton.click();
    cy.wait(1000);
    cy.screenshot('P05.9 Click_Delete_Post v4.44.0');
    postSection.modalDeleteButton.click();
    cy.wait(3000);
    cy.screenshot('P05.10 Click_Delete_Button v4.44.0');

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
