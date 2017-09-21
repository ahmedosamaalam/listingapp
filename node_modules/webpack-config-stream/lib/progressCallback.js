'use strict';

var path = require('path'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    Progress = require('progress');

/**
 * @constant
 * @private
 * @type {String}
 */
var PROGRESS_FIELD_NAME = 'progressBar';

/**
 * @constant
 * @private
 * @type {Number}
 */
var PROGRESS_TOTAL = Number.MAX_VALUE;

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Progress for webpack config';

/**
 * @constant
 * @private
 * @type {String}
 */
var TITLE = 'webpack';

/**
 * @private
 * @alias progressCallback
 * @function
 * @param {File} chunk
 * @param {Number} p
 * @param {String} msg
 */
function progressCallback(chunk, p, msg) {
    var percentage = Math.floor(p * 100) + '%',
        progress = chunk[PROGRESS_FIELD_NAME];

    if (p === 0) {
        progress = new Progress('[:title] :progress :message', {
            stream: process.stdout,
            total: PROGRESS_TOTAL
        });

        chunk[PROGRESS_FIELD_NAME] = progress;
    }

    if (p === 0) {
        var filename = path.resolve(chunk.path);

        gutil.log(MESSAGE, gutil.colors.magenta(tildify(filename)));
    } else if (p === 1) {
        msg += '\n';
    }

    progress.tick({
        title: gutil.colors.blue(TITLE),
        progress: percentage,
        message: gutil.colors.grey(msg)
    });
}

/**
 * @private
 * @module webpack-config-stream/lib/progressCallback
 * @returns {progressCallback}
 */
module.exports = progressCallback;
module.exports.MESSAGE = MESSAGE;
