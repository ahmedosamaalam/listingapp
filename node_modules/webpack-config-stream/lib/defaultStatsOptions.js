'use strict';

/**
 * @private
 * @constant
 * @alias DEFAULT_STATS_OPTIONS
 * @type {Object}
 */
var DEFAULT_STATS_OPTIONS = {
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
};

/**
 * @private
 * @module webpack-config-stream/lib/DEFAULT_STATS_OPTIONS
 * @returns {DEFAULT_STATS_OPTIONS}
 */
module.exports = DEFAULT_STATS_OPTIONS;
