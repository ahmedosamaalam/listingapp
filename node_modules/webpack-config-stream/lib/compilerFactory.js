'use strict';

var path = require('path'),
    _ = require('lodash'),
    webpack = require('webpack'),
    ProgressPlugin = require('webpack/lib/ProgressPlugin'),
    MemoryFs = require('memory-fs'),
    configFactory = require('./configFactory');

/**
 * Creates compiler
 * @alis CompilerFactory
 * @private
 * @param {File} file
 * @param {Object} compilerOptions
 * @param {Configuration=} webpackOptions
 * @returns {Compiler}
 */
function CompilerFactory(file, compilerOptions, webpackOptions) {
    if (!_.isObject(compilerOptions)) {
        compilerOptions = {};
    }

    var config = configFactory(path.resolve(file.path), webpackOptions),
        compiler = config && webpack(config);

    if (compiler) {
        var useMemoryFs = compilerOptions.useMemoryFs === true,
            hasProgress = _.isFunction(compilerOptions.progress);

        if (useMemoryFs) {
            compiler.outputFileSystem = new MemoryFs();
        }

        if (hasProgress) {
            var progress = compilerOptions.progress;

            compiler.apply(new ProgressPlugin(function(p, msg) {
                progress(file, p, msg);
            }));
        }
    }

    return compiler;
}

/**
 * @private
 * @module webpack-config-stream/lib/compilerFactory
 * @returns {CompilerFactory}
 */
module.exports = CompilerFactory;
