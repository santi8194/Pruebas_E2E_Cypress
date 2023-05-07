export default class DesignSection {
    get labelInput() {
        return cy.get('input[placeholder="Label"]').eq(-2);
    }
    get urlInput() {
        return cy.get("input[id='ember102']");
    }
    get addButton() {
        return cy.get("button").contains("Add");
    }
    createLink(label) {
        this.labelInput.type(label);
        this.addButton.click({force: true});
    }
    get saveButton() {
        return cy.get("button").contains("Save");
    }
    get verifyNewLabel() {
        return cy.get('input[placeholder="Label"]')
            .should(($inputs) => {
                expect($inputs.toArray().some((input) => input.value === 'AnotherHome')).to.be.true;
            });
    }
    get labelToChange() {
        return cy.get('input[placeholder="Label"][id="ember89"]');
    }
    editLabel(addedName) {
        this.labelToChange.type(addedName);
    }
    get editedLabel() {
        return cy.get('input[placeholder="Label"][id="ember140"]');
    }
    get clickHelpDeleteButton() {
       return cy
           .get('button')
           .filter(':contains("Delete")')
           .last()
           .then(($button) => {
               cy.wrap($button).click();
           })
    }
    get validateDeletedLink() {
        return cy.get('input[placeholder="Label"]').each(($input) => {
            cy.wrap($input)
                .invoke('val')
                .then((value) => {
                    expect(value).to.not.equal('Help');
                })
        })
    }
}