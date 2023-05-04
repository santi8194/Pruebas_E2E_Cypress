export default class PageSection {
  get newPageButton() {
    return cy.get("a").contains("New page");
  }

  get editorContainerTitle() {
    return cy.get("textarea[placeholder='Page Title']");
  }

  get editorContainerBody() {
    return cy.get("div[data-placeholder='Begin writing your page...']");
  }

  get editorPublishDropdown() {
    return cy.get("div[role='button']").contains("Publish");
  }

  get editorPublishButton() {
    return cy.get("button").contains("Publish");
  }

  get editorSettingsButton() {
    return cy.get("button[title='Settings']");
  }

  get editorViewPage() {
    return cy.get("a.post-view-link");
  }

  get goBackToPagesSection() {
    return cy.get("a").contains("Pages");
  }

  pageInList(title) {
    return cy
      .get("li.gh-list-row.gh-posts-list-item")
      .filter(`:contains(${title})`)
      .first();
  }

  publishPage() {
    this.editorPublishDropdown.click();
    this.editorPublishButton.click();
    cy.wait(3000);
  }

  createPage(title, content) {
    this.newPageButton.click();
    cy.wait(1000);
    this.editorContainerTitle.type(title);
    this.editorContainerBody.type(content);
  }
}
