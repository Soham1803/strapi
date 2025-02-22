'use strict';

const path = require('path');

const moduleNameMapper = {
  '.*\\.(css|less|styl|scss|sass)$': '@strapi/admin-test-utils/file-mock',
  '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
    '@strapi/admin-test-utils/file-mock',
  /**
   * we're mapping the following packages to the monorepos node_modules
   * so if you link a package e.g. `design-system` the correct dependencies
   * are used and the tests run correctly.
   **/
  '^react$': path.join(__dirname, 'node_modules/react'),
  '^react-dom$': path.join(__dirname, 'node_modules/react-dom'),
  '^react-router-dom$': path.join(__dirname, 'node_modules/react-router-dom'),
  '^styled-components$': path.join(__dirname, 'node_modules/styled-components'),
};

module.exports = {
  rootDir: __dirname,
  moduleNameMapper,
  /* Tells jest to ignore duplicated manual mock files, such as index.js */
  modulePathIgnorePatterns: ['.*__mocks__.*'],
  testPathIgnorePatterns: ['node_modules/', '__tests__'],
  globalSetup: '@strapi/admin-test-utils/global-setup',
  setupFiles: ['@strapi/admin-test-utils/environment'],
  setupFilesAfterEnv: ['@strapi/admin-test-utils/after-env'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)s(x)?$': [
      '@swc/jest',
      {
        env: {
          coreJs: '3.28.0',
          mode: 'usage',
        },

        jsc: {
          parser: {
            jsx: true,
            dynamicImport: true,
          },
          // this should match the minimum supported node.js version
          target: 'es2020',
        },
      },
    ],
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      path.join(__dirname, 'fileTransformer.js'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-dnd|dnd-core|react-dnd-html5-backend|@strapi/design-system|@strapi/icons|fractional-indexing)/)',
  ],
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironmentOptions: {
    url: 'http://localhost:1337/admin',
  },
  // Use `jest-watch-typeahead` version 0.6.5. Newest version 1.0.0 does not support jest@26
  // Reference: https://github.com/jest-community/jest-watch-typeahead/releases/tag/v1.0.0
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
