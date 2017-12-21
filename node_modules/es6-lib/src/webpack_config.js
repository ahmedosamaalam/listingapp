import webpack from 'webpack'
import path from 'path'

export default function (config) {
  let rootDir = config.rootDir
    , noParse = config.noParse || []
  return {
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components']
    },
    resolveLoader: {
      root: path.join(__dirname, "../node_modules")
    },
    module: {
      noParse: noParse,
      loaders: getLoaders(config.es5mode)
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      )
    ],
    entry: `${rootDir}/test/test.js`,
    output: {
      path: `${rootDir}/dist`,
      filename: '_test_bundle.js'
    }
  }
}

function getLoaders (es5mode) {
  if (es5mode) return []

  return [{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }]
}
