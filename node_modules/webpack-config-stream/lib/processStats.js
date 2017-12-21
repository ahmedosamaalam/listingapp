'use strict';

var path = require('path'),
    fallbackFs = require('fs'),
    _ = require('lodash'),
    gutil = require('gulp-util'),
    util = require('./util');

/**
 * @constant
 * @private
 * @type {String}
 */
var STATS_DATA_FIELD_NAME = 'webpackStats';

/**
 * @constant
 * @private
 * @type {String}
 */
var STATS_FLAG_FIELD_NAME = 'isWebpackStats';

/**
 * @private
 * @function
 * @param {File} chunk
 * @param {Stats} stats
 * @returns {File[]}
 */
function getFiles(chunk, stats) {
    if (!util.isStats(stats)) {
        return [];
    }

    var compilation = stats.compilation,
        assets = compilation.assets || {},
        compiler = compilation.compiler,
        fs = util.isMemoryFs(compiler.outputFileSystem) ? compiler.outputFileSystem : fallbackFs;

    return _(assets).chain().keys().filter(function(key) {
        var asset = assets[key];

        return asset && asset.emitted === true;
    }).map(function(key) {
        var asset = assets[key],
            filename = asset.existsAt,
            base = path.resolve(filename, chunk.base),
            contents = fs.readFileSync(filename);

        return new gutil.File({
            base: base,
            path: filename,
            contents: contents
        });
    }).value();
}

/**
 * @private
 * @function
 * @param {Stats} stats
 * @returns {Stats[]}
 */
function toMultiStats(stats) {
    var multiStats = [];

    if (util.isStats(stats)) {
        multiStats = [stats];
    } else if (util.isMultiStats(stats)) {
        multiStats = stats.stats;
    }

    return multiStats;
}

/**
 * @private
 * @function
 * @param {File} chunk
 * @param {Stats} stats
 */
function getMultiFiles(chunk, stats) {
    var multiStats = toMultiStats(stats);

    return _(multiStats).chain().map(function(x) {
        return getFiles(chunk, x);
    }).flatten().value();
}

/**
 * @private
 * @alias processStats
 * @function
 * @param {File} chunk
 * @param {Stats} stats
 * @this Stream
 */
function processStats(chunk, stats) {
    var isStats = util.isStats(stats) || util.isMultiStats(stats);

    if (isStats) {
        var files = getMultiFiles(chunk, stats);

        files.forEach(function (file) {
            this.push(file);
        }, this);

        chunk[STATS_DATA_FIELD_NAME] = stats;
        chunk[STATS_FLAG_FIELD_NAME] = isStats;
    }
}

/**
 * @private
 * @module webpack-config-stream/lib/processStats
 * @returns {processStats}
 */
module.exports = processStats;
module.exports.STATS_DATA_FIELD_NAME = STATS_DATA_FIELD_NAME;
module.exports.STATS_FLAG_FIELD_NAME = STATS_FLAG_FIELD_NAME;
