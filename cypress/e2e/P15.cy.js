import StaffSection from "../support/elements/staffSection";
import AdminMenu from "../support/elements/adminMenu";
import Site from "../support/elements/site";

const staffSection = new StaffSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Suspender usuario", () => {
  it("Suspender usuario", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede cambiar contraseñas
    cy.login();
    cy.wait(1000);
    cy.screenshot("P15.1 Login v4.44.0")

    // Va a la pestaña Tags
    adminMenu.staffTab.click();
    cy.wait(1000);
    cy.screenshot("P15.2 Click Staff v4.44.0")

    // Ingresa al Usuario que la va a cambiar la contraseña
    staffSection.staffInList().click();
    cy.wait(1000);
    cy.screenshot("P15.3 Buscar usuario Ghost v4.44.0")

    //Cambiar contraseña para el usuario Ghosh
    const password = Cypress.env("password");
    staffSection.replacePass(password);
    cy.wait(1000);
    cy.screenshot("P15.4 Reemplazar Pass usuario Ghost v4.44.0")
    staffSection.changePass.click();
    cy.wait(1000);
    cy.screenshot("P15.5 Almacenar Pass usuario Ghost v4.44.0")

    /* 
    -------------
      WHEN
    -------------
    */

    // Clic en lista desplegable de ajustes
    staffSection.staffProfileConfiguration.click({ force: true });
    cy.wait(1000);
    cy.screenshot("P15.6 Selección settings v4.44.0")
    // Suspender usuario
    staffSection.clickInSuspendStaffMember.click();
    cy.wait(1000);
    cy.screenshot("P15.7 Selección Suspender v4.44.0")
    staffSection.suspendStaffMember.click();
    cy.wait(1000);
    cy.screenshot("P15.8 Suspender Usuario v4.44.0")
    // Volver a la pestaña Staff
    adminMenu.staffTab.click();
    cy.wait(1000);
    cy.screenshot("P15.9 Click staff v4.44.0")
    
    const baseUrl = Cypress.config("baseUrl");
    cy.visit(baseUrl + "#/signout");
    cy.wait(1000);
    cy.screenshot("P15.10 Singout v4.44.0")
    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el cambio de contraseña ha sido correcto
    const userghost = Cypress.env("userghost");
    cy.loginWithCredentials(userghost, password);
    cy.wait(1000);
    cy.screenshot("P15.11 Ingresar usuario ghost v4.44.0")
  });
});
