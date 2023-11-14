import {defineConfig} from "cypress"
import webpackPreprocessor from "@cypress/webpack-preprocessor"


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require('./webpack.config'),
        watchOptions: {}
      }    
      on('file:preprocessor', webpackPreprocessor(options))
    },
    baseUrl: "http://localhost:3000",
    supportFile: false,
    fixturesFolder: false,
    specPattern: 'src/main/test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
});


