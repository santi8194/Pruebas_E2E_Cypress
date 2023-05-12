import { faker } from "@faker-js/faker";

import PostSection from "../support/elements/postsSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de un post nuevo y validación de disponibilidad en la aplicación.", () => {
  it("Publicación de un post nuevo y validación de disponibilidad en la aplicación.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear posts
    cy.login();
    cy.screenshot('P01.1 Login v4.44.0')

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);
    cy.screenshot('P01.2 Click_Post v4.44.0')

    /* 
    -------------
      WHEN
    -------------
    */

    // Crea el post
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);
    cy.screenshot('P01.3 Create_Post v4.44.0')

    // Publica el post
    postSection.publishPost();
    cy.screenshot('P01.4 Publish_Post v4.44.0')

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca en la lista de posts
    postSection.goBackToPostsSection.click();
    cy.screenshot('P01.5 Back_To_Post v4.44.0')
    postSection.postInList(title).click();
    cy.screenshot('P01.6 Click_New_Post v4.44.0')

    // Verifica que el post aparezca visible en el sitio
    postSection.editorSettingsButton.click();
    cy.screenshot('P01.7 Click_Post_Settings v4.44.0')
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    cy.screenshot('P01.8 Click_View_Post v4.44.0')
    site.postTitle.contains(title);
  });
});
