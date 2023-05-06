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

   //Cambiar contraseña para el usuario Ghosh
   const password = Cypress.env("password");
   staffSection.replacePass(password);
   staffSection.changePass.click();
   cy.wait(2000);

    /* 
    -------------
      WHEN
    -------------
    */
 
    // Clic en lista desplegable de ajustes
    staffSection.staffProfileConfiguration.click({force: true});
    // Suspender usuario
    staffSection.clickInSuspendStaffMember.click();
    cy.wait(1000);
    staffSection.suspendStaffMember.click();
    cy.wait(1000);
    // Volver a la pestaña Staff
    adminMenu.staffTab.click();
    cy.wait(1000);
    
    //Salir de la sesión actual    
    adminMenu.staffTab.click();
    cy.wait(2000);
    const baseUrl = Cypress.config("baseUrl");    
    cy.visit(baseUrl + '#/signout');
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
