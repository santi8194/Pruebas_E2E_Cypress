export default class PostSection {
  get newPostButton() {
    return cy.get("a").contains("New post");
  }

  get editorContainerTitle() {
    return cy.get("textarea[placeholder='Post Title']");
  }

  get editorContainerBody() {
    return cy.get("div[data-placeholder='Begin writing your post...']");
  }

  get editorPublishDropdown() {
    return cy.get("div[role='button']").contains("Publish");
  }

  get editorPublishButton() {
    return cy.get("button").contains("Publish");
  }

  get editorUpdateDropdown() {
    return cy.get("div[role='button']").contains("Update");
  }

  get editorUpdateButton() {
    return cy.get("button").contains("Update");
  }

  get editorSettingsButton() {
    return cy.get("button[title='Settings']");
  }

  get editorDeletePostButton() {
    return cy.get("button").contains("Delete post");
  }

  get modalDeleteButton() {
    return cy.get("button.gh-btn-red").contains("Delete");
  }

  get editorViewPost() {
    return cy.get("a.post-view-link");
  }

  get goBackToPostsSection() {
    return cy.get("a").contains("Posts");
  }

  postInList(title) {
    return cy
      .get("li.gh-list-row.gh-posts-list-item")
      .filter(`:contains(${title})`)
      .first();
  }

  notPostInList(title) {
    return cy
      .get("li.gh-list-row.gh-posts-list-item")
      .filter(`:contains(${title})`)
      .should("not.exist");
  }

  publishPost() {
    this.editorPublishDropdown.click();
    this.editorPublishButton.click();
    cy.wait(3000);
  }

  createPost(title, content) {
    this.newPostButton.click();
    cy.wait(1000);
    this.editorContainerTitle.type(title);
    this.editorContainerBody.type(content);
  }
}
