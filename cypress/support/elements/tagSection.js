export default class TagSection {
    get newPageButton() {
      return cy.get("a").contains("New tag");
    }

    get saveTag() {
        return cy.get("button").contains("Save");
    }
  
    get editorContainerTitle() {
      return cy.get('#tag-name');
    }
  
    get editorContainerSlug() {
      return cy.get('#tag-slug');
    }

    get editorContainerDescription() {
        return cy.get('#tag-description');
    }

    pageInList(title) {
        return cy
          .get("li.gh-list-row.gh-tags-list-item")
          .filter(`:contains(${title})`)
          .first();
      }
  
    createPage(title, slug , content) {
      this.newPageButton.click();
      cy.wait(1000);
      this.editorContainerTitle.type(title);
      this.editorContainerSlug.type(slug);
      this.editorContainerDescription.type(content);
    }
  }
  
