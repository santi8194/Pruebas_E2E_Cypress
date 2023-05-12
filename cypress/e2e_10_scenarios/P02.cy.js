import { faker } from "@faker-js/faker";
import PostSection from "../support/elements/postsSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Publicación de un existente post en estado 'Borrador' y validación de disponibilidad en la aplicación.", () => {
  it("Publicación de un existente post en estado 'Borrador' y validación de disponibilidad en la aplicación.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear posts
    cy.login();
    cy.screenshot('P02.1 Login v4.44.0')

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);
    cy.screenshot('P02.2 Click_Post v4.44.0')

    // Crea el post borrador
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);
    cy.screenshot('P02.3 Create_Post v4.44.0')
    postSection.goBackToPostsSection.click();
    cy.wait(1000);
    cy.screenshot('P02.4 Back_To_Posts v4.44.0')

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post borrador
    postSection.postInList(title).click();
    cy.screenshot('P02.5 Click_New_Post v4.44.0')

    // Publica el post
    postSection.publishPost();
    cy.screenshot('P02.6 Publish_Post v4.44.0')

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca en la lista de posts con el estado "Published"
    postSection.goBackToPostsSection.click();
    cy.screenshot('P02.7 Back_To_Posts v4.44.0')
    const post = postSection.postInList(title);
    post.contains("Published");
    post.click();
    cy.screenshot('P02.8 Click_Post v4.44.0')

    // Verifica que el post aparezca visible en el sitio
    postSection.editorSettingsButton.click();
    cy.screenshot('P02.9 Click_Settings v4.44.0')
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    cy.screenshot('P02.10 View_Post v4.44.0')
    site.postTitle.contains(title);
  });
});
