'use strict';

var webpack = require('webpack'),
    WebpackConfig = require('webpack-config'),
    runStream = require('./lib/runStream'),
    formatStream = require('./lib/formatStream'),
    failAfterStream = require('./lib/failAfterStream'),
    closestStream = require('./lib/closestStream'),
    watchStream = require('./lib/watchStream'),
    proxyStream = require('./lib/proxyStream'),
    propsStream = require('./lib/propsStream'),
    initStream = require('./lib/initStream'),
    ignoreStream = require('./lib/ignoreStream');

/**
 * Called when `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.
 * **Note**: `this` is stream of `webpack.config.js` file.
 * @callback compilationCallback
 * @type {Function}
 * @param {Error} err - Error.
 * @param {Stats} stats - Stats.
 * @this Stream
 */

/**
 * Error
 * @external Error
 * @type {Error}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 */

/**
 * Stats
 * @external Stats
 * @type {Object}
 * @see {@link https://webpack.github.io/docs/node.js-api.html#stats}
 */

/**
 * Configuration
 * @external Configuration
 * @see {@link https://webpack.github.io/docs/configuration.html#configuration-object-content}
 */

/**
 * Webpack
 * @external Webpack
 * @see {@link https://webpack.github.io/docs/node.js-api.html webpack}
 */

/**
 * WebpackConfig
 * @external WebpackConfig
 * @see {@link https://mdreizin.github.io/webpack-config webpack-config}
 */

/**
 * Stream
 * @external Stream
 * @see {@link https://github.com/rvagg/through2 through2}
 */

/**
 * File
 * @external File
 * @see {@link https://github.com/gulpjs/vinyl vinyl}
 */

/**
 * Compiler
 * @external Compiler
 * @see {@link https://github.com/webpack/webpack/blob/master/lib/Compiler.js compiler}
 */

/**
 * @alias index
 */
var index = {};

/**
 * @property {runStream}
 * @static
 */
index.run = runStream;

/**
 * @property {formatStream}
 * @static
 */
index.format = formatStream;

/**
 * @property {failAfterStream}
 * @static
 */
index.failAfter = failAfterStream;

/**
 * @property {closestStream}
 * @static
 */
index.closest = closestStream;

/**
 * @property {watchStream}
 * @static
 */
index.watch = watchStream;

/**
 * @property {proxyStream}
 * @static
 */
index.proxy = proxyStream;

/**
 * @property {propsStream}
 * @static
 */
index.props = propsStream;

/**
 * @property {initStream}
 * @static
 */
index.init = initStream;

/**
 * @property {ignoreStream}
 * @static
 */
index.ignore = ignoreStream;

/**
 * @property {Webpack}
 * @static
 */
index.webpack = webpack;

/**
 * @property {WebpackConfig}
 * @readonly
 */
index.Config = WebpackConfig;

/**
 * @module webpack-config-stream
 * @returns {index}
 */
module.exports = index;
