module.exports = exports = {};
const { loadVue, aliasVueCompiler } = require('./vue');
const EslintPlugin = require('eslint-webpack-plugin');

exports.loadVue = loadVue;
exports.aliasVueCompiler = aliasVueCompiler;

/**
 * Configures webpack loader for app wide js
 *
 * @param {object} config - Babel loader configuration object
 * @param {string | array} [config.include] - Directory to be scanned for config code
 * @param {string | array} [config.exclude] - Directories that are not going to be parsed by the babel loader
 * @return {object} - Webpack configuration for the babel loader
 */
exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

/**
 * Configures eslint-webpack-plugin to enforce conventions in your scripts
 * @see {@link https://github.com/webpack-contrib/eslint-webpack-plugin}
 * @param {object} config - Eslint object configuration object
 * @param {string|array} [config.files] - Specify the glob pattern for finding files
 * @param {boolean} [config.fix] - If true, eslint will fix as many errors as possible. The fixes are made to the actual source files
 * @param {string|function} [config.formatter] - Specify the formatter that you would like to use to format your results
 * @return {object} - Webpack configuration for the eslint plugin
 */
exports.eslintPlugin = ({
  files = '.',
  fix = false,
  formatter = 'stylish',
} = {}) => ({
  plugins: [new EslintPlugin({
    files,
    fix,
    formatter,
  })],
});

