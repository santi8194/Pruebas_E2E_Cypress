const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3002/ghost/",
    env: {
      username: "username",
      password: "password",
      userghost: "ghost-author@example.com",
      versionGhost: "4.44.0",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
