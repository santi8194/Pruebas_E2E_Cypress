export default class LoginPage {
  get usernameInput() {
    return cy.get("input[name='identification']");
  }
  get passwordInput() {
    return cy.get("input[name='password']");
  }
  get submitButton() {
    return cy.get("button[type='submit']");
  }
  login(username, password) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.submitButton.click();
  }
}
