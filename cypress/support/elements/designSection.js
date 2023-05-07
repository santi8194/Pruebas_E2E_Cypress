export default class DesignSection {
    get labelInput() {
        return cy.get('input[placeholder="Label"][id="ember100"]');
    }
    get urlInput() {
        return cy.get("input[id='ember102']");
    }
    get addButton() {
        return cy.get("button").contains("Add");
    }
    createLink(label, url) {
        this.labelInput.type(label);
        this.urlInput.type(url);
        this.addButton.click({force: true});
    }
    get saveButton() {
        return cy.get("button").contains("Save");
    }
    get verifyNewLabel() {
        return cy
            .get("input[id='ember159']")
            .should('exist');
    }
    get verifyNewUrl() {
        return cy.get("input[id='ember161']").should('exist');
    }
    get labelToChange() {
        return cy.get('input[placeholder="Label"][id="ember89"]');
    }
    editLabel(addedName) {
        this.labelToChange.type(addedName);
    }
    
    
}