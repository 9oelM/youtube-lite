const path = require('path');
const ForkTsCheckerWebpackPlugin = require(`fork-ts-checker-webpack-plugin`);
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Field 'browser' doesn't contain a valid alias configuration
      // /Users/jm/Documents/Code/youtube-lite/packages/app/Users/jm/Documents/Code/youtube-lite/packages/src/utilities/essentials.jsx doesn't exist
      // it needs to be under 'app' folder
      "src": path.resolve('../app/src'),
      // https://github.com/storybookjs/storybook/issues/11255#issuecomment-673899817
      // 'core-js/modules': path.resolve(
      //     __dirname,
      //     '..',
      //     'node_modules/core-js/modules'
      // ),
    }
    config.plugins = [
      ...config.plugins, 
      new ForkTsCheckerWebpackPlugin(),
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        // include: /src/,
        // add errors to webpack instead of warnings
        failOnError: false,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      })
    ]
    // https://stackoverflow.com/questions/67070802/webpack-5-and-storybook-6-integration-throws-an-error-in-defineplugin-js
    config.resolve.fallback = {
      http: false,
    }

    return config;
  },
  core: {
    builder: "webpack5",
  }
}