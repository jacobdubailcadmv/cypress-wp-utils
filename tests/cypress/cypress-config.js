const { defineConfig } = require('cypress');
const { readConfig } = require('@wordpress/env/lib/config');

module.exports = defineConfig({
  fixturesFolder: 'tests/cypress/fixtures',
  screenshotsFolder: 'tests/cypress/screenshots',
  videosFolder: 'tests/cypress/videos',
  downloadsFolder: 'tests/cypress/downloads',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      return setBaseUrl(on, config);
    },
    specPattern: 'tests/cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/e2e.js',
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportFilename: 'mochawesome-[name]',
    reportDir: 'tests/cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },
});

/**
 * Set WP URL as baseUrl in Cypress config.
 *
 * @param {Function} on    function that used to register listeners on various events.
 * @param {object} config  Cypress Config object.
 * @returns config Updated Cypress Config object.
 */
const setBaseUrl = async (on, config) => {
  const wpEnvConfig = await readConfig('wp-env');

  if (wpEnvConfig) {
    const port = wpEnvConfig.env.tests.port || null;

    if (port) {
      config.baseUrl = wpEnvConfig.env.tests.config.WP_SITEURL;
    }
  }

  return config;
};
