const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:2368/ghost/",
    env: {
      username: "username",
      password: "password",
      userghost: "ghost-author@example.com",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
