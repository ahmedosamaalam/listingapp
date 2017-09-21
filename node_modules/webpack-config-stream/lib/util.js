'use strict';

var _ = require('lodash'),
    MemoryFs = require('memory-fs'),
    Stats = require('webpack/lib/Stats');

/**
 * @private
 * @module webpack-config-stream/lib/util
 */
module.exports = {
    /**
     * @function
     * @param {Object} fs
     * @returns {Boolean}
     */
    isMemoryFs: function(fs) {
        return _.isObject(fs) && fs instanceof MemoryFs;
    },

    /**
     * @function
     * @param {Object} stats
     * @returns {Boolean}
     */
    isStats: function(stats) {
        return _.isObject(stats) && stats instanceof Stats;
    },

    /**
     * @function
     * @param {Object} multiStats
     * @returns {Boolean}
     */
    isMultiStats: function(multiStats) {
        var stats = _.isObject(multiStats) && multiStats.stats;

        return _.isArray(stats) && _.every(stats, this.isStats, this);
    }
};
