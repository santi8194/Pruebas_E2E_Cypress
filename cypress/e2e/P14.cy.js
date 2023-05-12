import StaffSection from "../support/elements/staffSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const staffSection = new StaffSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Cambiar la contrasenia de un usuario.", () => {
  it("Cambiar la contrasenia de un usuario.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede cambiar contraseñas
    cy.login();
    cy.wait(1000);
    cy.screenshot("P14.1 Login v4.44.0")

    // Va a la pestaña Tags
    adminMenu.staffTab.click();
    cy.wait(1000);
    cy.screenshot("P14.2 click staff v4.44.0")

    // Ingresa al Usuario que la va a cambiar la contraseña
    staffSection.staffInList().click();
    cy.wait(1000);
    cy.screenshot("P14.3 click usuario Ghost v4.44.0")

    /* 
    -------------
      WHEN
    -------------
    */
    //Cambiar contraseña para el usuario Ghosh
    const password = Cypress.env("password");
    staffSection.replacePass(password);
    cy.wait(1000);
    cy.screenshot("P14.4 Cambio contraseña v4.44.0")
    staffSection.changePass.click();
    cy.wait(1000);
    cy.screenshot("P14.5 Guarda contraseña v4.44.0")    
    
    //Salir de la sesión actual    
    adminMenu.staffTab.click();
    cy.wait(1000);
    cy.screenshot("P14.6 click staff v4.44.0")    
    const baseUrl = Cypress.config("baseUrl");    
    cy.visit(baseUrl + '#/signout');
    cy.wait(1000);
    cy.screenshot("P14.7 Cierre de sesión v4.44.0")
    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el cambio de contraseña ha sido correcto
    const userghost = Cypress.env("userghost");
    cy.loginWithCredentials(userghost, password);
    cy.wait(1000);
    cy.screenshot("P14.8 Autenticación usuario Ghost v4.44.0")    
  });
});
