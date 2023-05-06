export default class TagSection {
    get newTagButton() {
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

    tagInList(title) {
        return cy
          .get("li.gh-list-row.gh-tags-list-item")
          .filter(`:contains(${title})`)
          .first();
      }
  
    createTag(title, slug , content) {
      this.newTagButton.click();
      cy.wait(1000);
      this.editorContainerTitle.type(title);
      this.editorContainerSlug.type(slug);
      this.editorContainerDescription.type(content);
    }

    updateTag(title) {
      this.editorContainerTitle.clear().type(title, {force: true});
    }

    
  }
  
