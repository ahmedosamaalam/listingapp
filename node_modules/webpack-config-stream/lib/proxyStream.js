'use strict';

var _ = require('lodash'),
    through = require('through2'),
    wrapError = require('./wrapError'),
    processStats = require('./processStats');

/**
 * Re-uses existing `err` and `stats` objects. Can be piped.
 * @function
 * @alias proxyStream
 * @param {Error=} err
 * @param {Stats=} stats
 * @returns {Stream}
 */
function proxyStream(err, stats) {
    return through.obj(function(chunk, enc, cb) {
        processStats.call(this, chunk, stats);

        if (_.isError(err)) {
            this.emit('error', wrapError(err));
        }

        cb(null, chunk);
    });
}

/**
 * @module webpack-config-stream/lib/proxyStream
 * @returns {proxyStream}
 */
module.exports = proxyStream;
