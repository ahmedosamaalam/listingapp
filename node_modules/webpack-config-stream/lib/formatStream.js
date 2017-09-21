'use strict';

var path = require('path'),
    _ = require('lodash'),
    tildify = require('tildify'),
    through = require('through2'),
    gutil = require('gulp-util'),
    DEFAULT_VERBOSE_STATS_OPTIONS = require('./defaultVerboseStatsOptions'),
    DEFAULT_STATS_OPTIONS = require('./defaultStatsOptions'),
    processStats = require('./processStats');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Stats for webpack config';

/**
 * Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.
 * @function
 * @alias formatStream
 * @param {Object=} options - Options to pass to {@link http://webpack.github.io/docs/node.js-api.html#stats-tostring `stats.toString()`}.
 * @param {Boolean} [options.verbose=false] - Writes fully formatted version of `stats` object.
 * @returns {Stream}
 */
function formatStream(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    var statsOptions = options.verbose === true ? _.defaults(options, DEFAULT_VERBOSE_STATS_OPTIONS) : _.defaults(options, DEFAULT_STATS_OPTIONS);

    if (!gutil.colors.supportsColor) {
        statsOptions.colors = false;
    }

    return through.obj(function(chunk, enc, cb) {
        var stats = chunk[processStats.STATS_DATA_FIELD_NAME],
            isStats = chunk[processStats.STATS_FLAG_FIELD_NAME];

        if (isStats) {
            var filename = path.resolve(chunk.path);

            gutil.log(MESSAGE, gutil.colors.magenta(tildify(filename)));
            gutil.log('\n' + stats.toString(statsOptions));
        }

        cb(null, chunk);
    });
}

/**
 * @module webpack-config-stream/lib/formatStream
 * @returns {formatStream}
 */
module.exports = formatStream;
module.exports.MESSAGE = MESSAGE;
