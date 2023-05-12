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
    cy.screenshot('P04.1 Login v4.44.0')

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);
    cy.screenshot('P04.2 Click_Post v4.44.0')

    // Crea el post a editar
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);
    cy.screenshot('P04.3 Create_Post v4.44.0');

    // Publica el post
    postSection.publishPost();
    cy.screenshot('P04.4 Publish_Post v4.44.0');
    postSection.goBackToPostsSection.click();
    cy.screenshot('P04.5 Back_To_Post v4.44.0');

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post a editar
    postSection.postInList(title).click();
    cy.screenshot('P04.6 Click_New_Post v4.44.0');

    // Edita el titulo
    const newTitle = faker.lorem.lines(1);
    postSection.editorContainerTitle.clear().type(newTitle);
    cy.screenshot('P04.7 Edit_Post_Title v4.44.0');
    postSection.editorUpdateDropdown.click();
    cy.screenshot('P04.8 Click_Update_Dropdown v4.44.0');
    postSection.editorUpdateButton.click();
    cy.wait(3000);
    cy.screenshot('P04.9 Click_Update_Button v4.44.0');;

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca en la lista de posts con el nuevo título
    postSection.goBackToPostsSection.click();
    cy.screenshot('P04.10 Back_To_Post v4.44.0');
    postSection.postInList(newTitle).click();
    cy.screenshot('P04.11 Click_New_Post v4.44.0');

    // Verifica que el post aparezca visible en el sitio con el nuevo título
    postSection.editorSettingsButton.click();
    cy.screenshot('P04.12 Click_Post_Settings v4.44.0');
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    cy.screenshot('P04.13 Click_View_Post v4.44.0');
    site.postTitle.contains(newTitle);
  });
});
