const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:2368/ghost/",
    env: {
      username: "tu_nombre_de_usuario",
      password: "tu_contraseña_secreta",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
