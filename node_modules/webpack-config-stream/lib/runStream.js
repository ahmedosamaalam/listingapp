'use strict';

var _ = require('lodash'),
    through = require('through2'),
    CompilerAdapter = require('./compilerAdapter'),
    initStream = require('./initStream'),
    propsStream = require('./propsStream'),
    wrapError = require('./wrapError'),
    processStats = require('./processStats');

/**
 * Accepts `webpack.config.js` files via `gulp.src()`, then compiles via `webpack.run()`. Re-emits all data passed from `webpack.run()`. Can be piped.
 * **Note**: Needs to be used after `webpack.init()` and `webpack.props()`.
 * @function
 * @alias runStream
 * @param {compilationCallback=} callback
 * @returns {Stream}
 */
function runStream(callback) {
    if (!_.isFunction(callback)) {
        callback = function() {};
    }

    return through.obj(function(chunk, enc, cb) {
        var webpackOptions = chunk[propsStream.FIELD_NAME] || {},
            compilerOptions = chunk[initStream.FIELD_NAME] || {};

        delete webpackOptions.watch;
        delete webpackOptions.watchOptions;

        var adapter = new CompilerAdapter(compilerOptions, webpackOptions);

        var compiler = adapter.run(chunk, function(err, stats) {
            processStats.call(this, chunk, stats);

            if (_.isError(err)) {
                this.emit('error', wrapError(err));
            }

            cb(null, chunk);
            callback.apply(chunk, [err, stats]);
        }.bind(this));

        if (_.isUndefined(compiler)) {
            cb();
        }
    });
}

/**
 * @module webpack-config-stream/lib/runStream
 * @returns {runStream}
 */
module.exports = runStream;
