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

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);

    // Crea el post borrador
    const title = faker.lorem.lines(1);
    const content = faker.lorem.paragraphs(1);

    postSection.createPost(title, content);
    postSection.goBackToPostsSection.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Selecciona el post borrador
    postSection.postInList(title).click();

    // Publica el post
    postSection.publishPost();

    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el post aparezca en la lista de posts con el estado "Published"
    postSection.goBackToPostsSection.click();
    const post = postSection.postInList(title);
    post.contains("Published");
    post.click();

    // Verifica que el post aparezca visible en el sitio
    postSection.editorSettingsButton.click();
    postSection.editorViewPost.invoke("attr", "href").then((href) => {
      cy.visit(href);
    });
    cy.wait(1000);
    site.postTitle.contains(title);
  });
});
