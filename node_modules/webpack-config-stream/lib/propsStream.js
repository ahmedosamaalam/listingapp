'use strict';

var _ = require('lodash'),
    through = require('through2');

/**
 * @constant
 * @private
 * @type {String}
 */
var FIELD_NAME = 'webpackOptions';

/**
 * Overrides existing properties of each `webpack.config.js` file. Can be piped.
 * @function
 * @alias propsStream
 * @param {Configuration=} options
 * @returns {Stream}
 */
function propsStream(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    return through.obj(function(chunk, enc, cb) {
        var webpackOptions = chunk[FIELD_NAME] || {};

        webpackOptions = _.merge(webpackOptions, options);

        chunk[FIELD_NAME] = webpackOptions;

        cb(null, chunk);
    });
}

/**
 * @module webpack-config-stream/lib/propsStream
 * @returns {propsStream}
 */
module.exports = propsStream;
module.exports.FIELD_NAME = FIELD_NAME;
