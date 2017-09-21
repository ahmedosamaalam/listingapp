'use strict';

var path = require('path'),
    gutil = require('gulp-util'),
    _ = require('lodash'),
    through = require('through2'),
    WebpackConfig = require('webpack-config');

/**
 * For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
 * **Note**: Needs to be used together with `webpack.watch()`.
 * **Note**: Needs to make sure that yor webpack config returns `module.exports = { filename: __filename };`.
 * @function
 * @alias closestStream
 * @param {String} [basename='webpack.config.js'] - The name of config file.
 * @returns {Stream}
 */
function closestStream(basename) {
    if (!_.isString(basename)) {
        basename = WebpackConfig.FILENAME;
    }

    return through.obj(function(chunk, enc, cb) {
        var filename = path.join(path.dirname(chunk.path), basename),
            config = WebpackConfig.finder.closest(filename);

        if (!_.isNull(config)) {
            this.push(new gutil.File({
                path: config.filename,
                base: chunk.base
            }));
        }

        cb();
    });
}

/**
 * @module webpack-config-stream/lib/closestStream
 * @returns {closestStream}
 */
module.exports = closestStream;
