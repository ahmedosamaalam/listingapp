'use strict';

var gutil = require('gulp-util');

/**
 * @private
 * @constant
 * @type {String}
 */
var PLUGIN_NAME = 'webpack-config-stream';

/**
 * @private
 * @function
 * @alias wrapError
 * @param {String|Error} message
 * @param {Object} options
 * @returns {Error}
 */
function wrapError(message, options) {
    return new gutil.PluginError(PLUGIN_NAME, message, options);
}

/**
 * @private
 * @module webpack-config-stream/lib/wrapError
 */
module.exports = wrapError;
