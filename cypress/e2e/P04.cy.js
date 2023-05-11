import { faker } from "@faker-js/faker";

import PostSection from "../support/elements/postsSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del título de un post existente y validación de cambios en la aplicación.", () => {
  it("Edición del título de un post existente y validación de cambios en la aplicación.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear posts
    cy.login();
    cy.screenshot('P04.1 Login v3.41.1')

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);
    cy.screenshot('P04.2 Click_Post v3.41.1')

    // Crea el post a editar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);
    cy.screenshot('P04.3 Create_Post v3.41.1');

    // Publica el post
    postSection.publishPost();
    cy.screenshot('P04.4 Publish_Post v3.41.1');
    postSection.goBackToPostsSection.click();
    cy.screenshot('P04.5 Back_To_Post v3.41.1');

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post a editar
    postSection.postInList(title).click();
    cy.screenshot('P04.6 Click_New_Post v3.41.1');

    // Edita el titulo
    const newTitle = faker.lorem.lines(1);
    postSection.editorContainerTitle.clear().type(newTitle);
    cy.screenshot('P04.7 Edit_Post_Title v3.41.1');
    postSection.editorUpdateDropdown.click();
    cy.screenshot('P04.8 Click_Update_Dropdown v3.41.1');
    postSection.editorUpdateButton.click();
    cy.wait(3000);
    cy.screenshot('P04.9 Click_Update_Button v3.41.1');;

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca en la lista de posts con el nuevo título
    postSection.goBackToPostsSection.click();
    cy.screenshot('P04.10 Back_To_Post v3.41.1');
    postSection.postInList(newTitle).click();
    cy.screenshot('P04.11 Click_New_Post v3.41.1');

    // Verifica que el post aparezca visible en el sitio con el nuevo título
    postSection.editorSettingsButton.click();
    cy.screenshot('P04.12 Click_Post_Settings v3.41.1');
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    cy.screenshot('P04.13 Click_View_Post v3.41.1');
    site.postTitle.contains(newTitle);
  });
});
