'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  var rootDir = config.rootDir,
      noParse = config.noParse || [];
  return {
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components']
    },
    resolveLoader: {
      root: _path2.default.join(__dirname, "../node_modules")
    },
    module: {
      noParse: noParse,
      loaders: getLoaders(config.es5mode)
    },
    plugins: [new _webpack2.default.ResolverPlugin(new _webpack2.default.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']))],
    entry: rootDir + '/test/test.js',
    output: {
      path: rootDir + '/dist',
      filename: '_test_bundle.js'
    }
  };
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoaders(es5mode) {
  if (es5mode) return [];

  return [{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }];
}