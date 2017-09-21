'use strict';

var _ = require('lodash'),
    through = require('through2'),
    progressCallback = require('./progressCallback');

/**
 * @constant
 * @private
 * @type {String}
 */
var FIELD_NAME = 'compilerOptions';

/**
 * Helps to init `webpack` compiler. Can be piped.
 * @function
 * @alias initStream
 * @param {Object=} options
 * @param {Boolean} [options.useMemoryFs=false] - Uses {@link https://github.com/webpack/memory-fs memory-fs} for `compiler.outputFileSystem`. Prevents writing of emitted files to file system. `gulp.dest()` can be used. `gulp.dest()` is resolved relative to {@link https://github.com/webpack/docs/wiki/configuration#outputpath output.path} if it is set; otherwise, it is resolved relative to {@link https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase options.base} (by default, the path of `gulpfile.js`).
 * @param {Boolean} [options.progress=false] - Adds ability to track compilation progress.
 * @returns {Stream}
 */
function initStream(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    return through.obj(function(chunk, enc, cb) {
        var compilerOptions = chunk[FIELD_NAME] || {};

        compilerOptions = _.merge(compilerOptions, options);

        if (options.progress === true) {
            compilerOptions.progress = progressCallback;
        }

        chunk[FIELD_NAME] = compilerOptions;

        cb(null, chunk);
    });
}

/**
 * @module webpack-config-stream/lib/initStream
 * @returns {initStream}
 */
module.exports = initStream;
module.exports.FIELD_NAME = FIELD_NAME;
