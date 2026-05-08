const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://teste-colmeia-qa.colmeia-corp.com',
    setupNodeEvents(on, config) {

    },
  },
});