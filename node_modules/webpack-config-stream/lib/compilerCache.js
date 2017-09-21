'use strict';

var path = require('path'),
    _ = require('lodash'),
    compilerFactory = require('./compilerFactory');

var compilers = {};

/**
 * @private
 * @alias CompilerCache
 * @class
 * @param {Object} compilerOptions
 * @param {Configuration=} webpackOptions
 * @constructor
 */
function CompilerCache(compilerOptions, webpackOptions) {
    if (!_.isObject(compilerOptions)) {
        compilerOptions = {};
    }

    if (!_.isObject(webpackOptions)) {
        webpackOptions = {};
    }

    this.compilerOptions = compilerOptions;
    this.webpackOptions = webpackOptions;
}

/**
 * Gets compiler
 * @param {File} file
 * @returns {Compiler}
 */
CompilerCache.prototype.getOrCreate = function(file) {
    var compiler = this.get(file.path);

    if (!compiler) {
        compiler = this.create(file);

        if (compiler) {
            this.put(file.path, compiler);
        }
    }

    return compiler;
};

/**
 * Creates compiler
 * @param {File} file
 * @returns {Compiler}
 */
CompilerCache.prototype.create = function(file) {
    return compilerFactory(file, this.compilerOptions, this.webpackOptions);
};

/**
 * Gets compiler
 * @param {String} filename
 * @returns {Compiler}
 */
CompilerCache.prototype.get = function(filename) {
    return compilers[path.resolve(filename)];
};

/**
 * Sets compiler
 * @param {String} filename
 * @param {Compiler} compiler
 */
CompilerCache.prototype.put = function(filename, compiler) {
    filename = path.resolve(filename);

    delete compilers[filename];

    compilers[filename] = compiler;
};

/**
 * @private
 * @module webpack-config-stream/lib/compilerCache
 * @returns {CompilerCache}
 */
module.exports = CompilerCache;
