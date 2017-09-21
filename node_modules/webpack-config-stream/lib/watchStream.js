'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    through = require('through2'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    CompilerAdapter = require('./compilerAdapter'),
    initStream = require('./initStream'),
    propsStream = require('./propsStream');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Waiting changes for webpack config';

/**
 * @constant
 * @private
 * @type {String}
 */
var TIMESTAMP_FIELD_NAME = 'lastModifiedAt';

/**
 * @private
 * @type {Object}
 */
var watchers = {};

/**
 * Accepts `webpack.config.js` files via `gulp.src()`, then compiles via `webpack.watch()`. Re-emits all data passed from `webpack.watch()`. Can be piped.
 * **Note**: Needs to be used after `webpack.init()` and `webpack.props()`.
 * @function
 * @alias watchStream
 * @param {compilationCallback=} callback
 * @returns {Stream}
 */
function watchStream(callback) {
    if (!_.isFunction(callback)) {
        callback = function() {};
    }

    return through.obj(function(chunk, enc, cb) {
        var fsStats = fs.statSync(chunk.path),
            watcher = watchers[chunk.path],
            isDirty = watcher && watcher[TIMESTAMP_FIELD_NAME] < fsStats.mtime;

        if (isDirty === true) {
            delete watchers[chunk.path];
        }

        if (!watchers[chunk.path]) {
            gutil.log(MESSAGE, gutil.colors.magenta(tildify(chunk.path)));

            var webpackOptions = chunk[propsStream.FIELD_NAME] || {},
                compilerOptions = chunk[initStream.FIELD_NAME] || {},
                adapter = new CompilerAdapter(compilerOptions, webpackOptions);

            watcher = adapter.watch(chunk, function(err, stats) {
                callback.apply(chunk, [err, stats]);
            });

            if (watcher) {
                watcher[TIMESTAMP_FIELD_NAME] = fsStats.mtime;

                watchers[chunk.path] = watcher;
            }
        }

        cb();
    });
}

/**
 * @module webpack-config-stream/lib/watchStream
 * @returns {watchStream}
 */
module.exports = watchStream;
module.exports.MESSAGE = MESSAGE;
