import { faker } from "@faker-js/faker";

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

    // Va a la pestaña Tags
    adminMenu.staffTab.click();
    cy.wait(1000);

    // Ingresa al Usuario que la va a cambiar la contraseña
    staffSection.staffInList().click();
    cy.wait(2000);

    /* 
    -------------
      WHEN
    -------------
    */
    //Cambiar contraseña para el usuario Ghosh
    const password = Cypress.env("password");
    staffSection.replacePass(password);
    staffSection.changePass.click();
    cy.wait(2000);
    
    //Salir de la sesión actual    
    adminMenu.staffTab.click();
    cy.wait(2000);
    const baseUrl = Cypress.config("baseUrl");    
    cy.visit(baseUrl + '#/signout');
    //cy.visit('http://localhost:2368/ghost/#/signout');    

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el cambio de contraseña ha sido correcto
    const userghost = Cypress.env("userghost");
    cy.loginWithCredentials(userghost, password);
    cy.wait(1000);    
  });
});
