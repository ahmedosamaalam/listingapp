'use strict';

var path = require('path'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    _ = require('lodash'),
    through = require('through2'),
    wrapError = require('./wrapError'),
    processStats = require('./processStats');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Failed webpack configs';

/**
 * @function
 * @param {String[]} files
 * @returns {String}
 */
function messageFor(files) {
    files = files.map(function(filename) {
        return gutil.colors.magenta(tildify(filename));
    });

    return [gutil.colors.red(MESSAGE), '[' + files.join(', ') + ']'].join(' ');
}

/**
 * Stops a task if some `stats` objects have some errors or warnings. Can be piped.
 * @function
 * @alias failAfterStream
 * @param {Object=} options - Options.
 * @param {Boolean} [options.errors=false] - Fails build if some `stats` objects have some errors.
 * @param {Boolean} [options.warnings=false] - Fails build if some `stats` objects have some warnings.
 * @returns {Stream}
 */
function failAfterStream(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    var files = [];

    return through.obj(function(chunk, enc, cb) {
        var stats = chunk[processStats.STATS_DATA_FIELD_NAME],
            isStats = chunk[processStats.STATS_FLAG_FIELD_NAME],
            filename = path.resolve(chunk.path);

        if (isStats && !_.includes(files, filename)) {
            var hasErrors = false,
                hasWarnings = false;

            if (options.errors === true) {
                hasErrors = stats.hasErrors();
            }

            if (options.warnings === true) {
                hasWarnings = stats.hasWarnings();
            }

            if (hasErrors || hasWarnings) {
                files.push(filename);
            }
        }

        cb(null, chunk);
    }).on('end', function() {
        if (files.length > 0) {
            var message = messageFor(files);

            this.emit('error', wrapError(message, {
                showProperties: false,
                showStack: false
            }));
        }
    });
}

/**
 * @module webpack-config-stream/lib/failAfterStream
 * @returns {failAfterStream}
 */
module.exports = failAfterStream;
module.exports.MESSAGE = MESSAGE;
