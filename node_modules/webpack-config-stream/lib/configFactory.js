'use strict';

var path = require('path'),
    _ = require('lodash'),
    WebpackConfig = require('webpack-config');

/**
 * Creates config
 * @alis ConfigFactory
 * @private
 * @param {String} filename
 * @param {Configuration=} options
 * @returns {Config|Config[]}
 */
function ConfigFactory(filename, options) {
    if (!_.isObject(options)) {
        options = {};
    }

    var config = WebpackConfig.loader.load(filename),
        isArray = _.isArray(config);

    if (!isArray) {
        config = [config];
    }

    config = _.map(config, function(x) {
        x.merge(options);
        x.defaults({
            output: {
                path: path.dirname(filename)
            }
        });

        return x;
    });

    return isArray ? config : _.first(config);
}

/**
 * @private
 * @module webpack-config-stream/lib/configFactory
 * @returns {ConfigFactory}
 */
module.exports = ConfigFactory;
