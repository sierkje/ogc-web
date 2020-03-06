// @ts-check

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// @ts-ignore
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
// @ts-ignore
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
// @ts-ignore
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const resolve = require('resolve')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const from = require('../helpers/from')

const SERVER_BUILD = from.server('build')
const SERVER_NODE_MODULES = from.server('node_modules')
const SERVER_ROOT = from.server()
const SERVER_SRC_INDEX = from.server('src', 'index.ts')
const SERVER_TSCONFIG = from.server('tsconfig.json')

/**
 * @param {"development" | "production"} mode
 * @returns {webpack.Configuration}
 */
function getWebpackServerConfig(mode) {
  const isDevelopmentConfig = mode === 'development'
  const isProductionConfig = !isDevelopmentConfig

  return {
    bail: isProductionConfig,
    devtool: isDevelopmentConfig ? 'inline-source-map' : 'source-map',
    entry: isDevelopmentConfig
      ? ['webpack/hot/poll?1000', SERVER_SRC_INDEX]
      : SERVER_SRC_INDEX,
    externals: [
      nodeExternals(
        isDevelopmentConfig
          ? {
              whitelist: ['webpack/hot/poll?1000'],
            }
          : {}
      ),
    ],
    mode: isDevelopmentConfig ? 'development' : 'production',
    module: {
      rules: [
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        // {
        //   test: /\.(js|ts)$/,
        //   enforce: 'pre',
        //   use: [
        //     {
        //       options: {
        //         cache: true,
        //         formatter: require.resolve('react-dev-utils/eslintFormatter'),
        //         eslintPath: require.resolve('eslint'),
        //       },
        //       loader: require.resolve('eslint-loader'),
        //     },
        //   ],
        //   include: SERVER_SRC,
        // },
        {
          oneOf: [
            // Process server/src JS and TS with Babel.
            {
              test: /\.(js|ts)$/,
              loader: require.resolve('babel-loader'),
              options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: !isProductionConfig,
                babelrc: false,
                presets: [
                  ['@babel/env', { targets: { node: 'current' } }],
                  '@babel/preset-typescript',
                ],
                plugins: [
                  '@babel/proposal-class-properties',
                  '@babel/proposal-object-rest-spread',
                ],
              },
            },
            // Process any JS outside of server/src with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\.(js)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps: true,
                inputSourceMap: true,
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: 'index.js',
      globalObject: 'global',
      path: SERVER_BUILD,
      pathinfo: true,
    },
    performance: false,
    plugins: [
      new CleanWebpackPlugin(),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(SERVER_ROOT),
      ...(isDevelopmentConfig
        ? [new webpack.HotModuleReplacementPlugin()]
        : []),
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: SERVER_NODE_MODULES,
        }),
        async: isDevelopmentConfig,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        tsconfig: SERVER_TSCONFIG,
        reportFiles: [
          '**',
          '!**/__tests__/**',
          '!**/?(*.)(spec|test).*',
          '!**/src/setupProxy.*',
          '!**/src/setupTests.*',
        ],
        silent: true,
        formatter: typescriptFormatter,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
    },
    target: 'node',
    watch: isDevelopmentConfig,
  }
}

module.exports = getWebpackServerConfig
