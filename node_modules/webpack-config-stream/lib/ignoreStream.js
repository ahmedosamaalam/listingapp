'use strict';

var path = require('path'),
    _ = require('lodash'),
    through = require('through2'),
    WebpackConfig = require('webpack-config'),
    minimatch = require('minimatch');

/**
 * @constant
 * @private
 * @type {Object}
 */
var MINIMATCH_OPTIONS = {
    matchBase: true
};

/**
 * Prevents writing of `webpack.config.js`. Can be piped.
 * @function
 * @alias ignoreStream
 * @param {String} [pattern='webpack.config.js'] - `minimatch` {@link https://github.com/isaacs/minimatch#features pattern}.
 * @returns {Stream}
 */
function ignoreStream(pattern) {
    if (!_.isString(pattern)) {
        pattern = WebpackConfig.FILENAME;
    }

    return through.obj(function(chunk, enc, cb) {
        var isIgnored = minimatch(path.resolve(chunk.path), pattern, MINIMATCH_OPTIONS);

        if (!isIgnored) {
            cb(null, chunk);
        } else {
            cb();
        }
    });
}

/**
 * @module webpack-config-stream/lib/ignoreStream
 * @returns {ignoreStream}
 */
module.exports = ignoreStream;
