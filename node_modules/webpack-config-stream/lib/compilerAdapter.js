'use strict';

var _ = require('lodash'),
    CompilerCache = require('./compilerCache');

/**
 * @constant
 * @private
 * @type {String}
 */
var WATCHER_FIELD_NAME = 'watcher';

/**
 * @private
 * @alias CompilerAdapter
 * @class
 * @param {Object} compilerOptions
 * @param {Configuration=} webpackOptions
 * @constructor
 */
function CompilerAdapter(compilerOptions, webpackOptions) {
    this.compilerCache = new CompilerCache(compilerOptions, webpackOptions);
}

/**
 * Runs compiler
 * @param {File} file
 * @param {compilationCallback} callback
 * @returns {Compiler}
 */
CompilerAdapter.prototype.run = function(file, callback) {
    if (!_.isFunction(callback)) {
        throw new Error('callback is required');
    }

    var compiler = this.compilerCache.getOrCreate(file);

    if (compiler) {
        compiler.run(callback);
    }

    return compiler;
};

/**
 * Runs compiler in `watch` mode
 * @param {File} file
 * @param {compilationCallback} callback
 * @returns {Compiler}
 */
CompilerAdapter.prototype.watch = function(file, callback) {
    if (!_.isFunction(callback)) {
        throw new Error('callback is required');
    }

    var compiler = this.compilerCache.getOrCreate(file),
        watcher;

    if (compiler) {
        var watchOptions = compiler.options && compiler.watchOptions || {};

        watcher = compiler[WATCHER_FIELD_NAME];

        if (watcher) {
            watcher.close(function() {});

            compiler = this.compilerCache.create(file);
        }

        watcher = compiler.watch(watchOptions, callback);

        if (watcher) {
            compiler[WATCHER_FIELD_NAME] = watcher;

            this.compilerCache.put(file.path, compiler);
        }
    }

    return watcher;
};

/**
 * @private
 * @module webpack-config-stream/lib/compilerAdapter
 * @returns {CompilerAdapter}
 */
module.exports = CompilerAdapter;
