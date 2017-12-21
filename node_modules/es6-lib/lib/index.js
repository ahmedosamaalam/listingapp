'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  var rootDir = config.rootDir;
  var gulp = config.gulp;
  var testEnv = config.testEnv;
  var webpackNoParse = config.webpackNoParse;
  var es5mode = config.es5mode;

  var src = rootDir + '/src',
      test = rootDir + '/test',
      dist = rootDir + '/dist',
      lib = rootDir + '/lib',
      mochaPhantomConfig = {
    phantomjs: {
      useColors: true,
      settings: {
        webSecurityEnabled: false
      }
    }
  };

  gulp.task('default', ['watch']);

  gulp.task('watch', ['test'], function () {
    gulp.watch([src + '/**/*', test + '/**/*'], ['test']);
  });

  gulp.task('prepublish', ['build']);

  gulp.task('build', ['copy-nonjs', 'build-js']);

  gulp.task('test', ['test-' + testEnv]);

  gulp.task('test-browser', ['webpack'], function () {
    return gulp.src(test + '/runner.html').pipe((0, _gulpMochaPhantomjs2.default)(mochaPhantomConfig)).on('error', onerror);
  });

  gulp.task('test-node', ['build'], function () {
    gulp.src([test + '/**/*.js']).pipe((0, _gulpMocha2.default)()).on('error', onerror);
  });

  gulp.task("webpack", ['build'], function () {
    var config = (0, _webpack_config2.default)({
      rootDir: rootDir,
      noParse: webpackNoParse,
      es5mode: es5mode
    }),
        entry = config.entry,
        output = config.output.path;

    return gulp.src(entry).pipe((0, _webpackStream2.default)(config)).pipe(gulp.dest(output));
  });

  gulp.task('clean', function (cb) {
    return (0, _del2.default)(lib, cb);
  });

  gulp.task('copy-nonjs', ['clean'], function () {
    return gulp.src([src + '/**/*', '!' + src + '/**/*.js']).pipe(gulp.dest(lib));
  });

  gulp.task('build-js', ['clean'], function () {
    if (es5mode) return gulp.src(src + '/**/*.js').pipe(gulp.dest(lib));else return gulp.src(src + '/**/*.js').pipe((0, _gulpBabel2.default)({
      presets: ['es2015']
    })).pipe(gulp.dest(lib));
  });

  /*
   *  gulp patch     # makes v0.1.0 → v0.1.1
   *  gulp feature   # makes v0.1.1 → v0.2.0
   *  gulp release   # makes v0.2.1 → v1.0.0
   */
  gulp.task('patch', function () {
    return inc('patch');
  });
  gulp.task('feature', function () {
    return inc('minor');
  });
  gulp.task('release', function () {
    return inc('major');
  });

  function onerror(err) {
    console.error(err);
    this.emit('end');
  }

  function inc(importance) {
    return gulp.src(['./package.json', './bower.json']).pipe((0, _gulpBump2.default)({ type: importance })).pipe(gulp.dest('./')).pipe(_gulpGit2.default.commit('version bump')).pipe((0, _gulpFilter2.default)('package.json')).pipe((0, _gulpTagVersion2.default)({ prefix: '' }));
  }
};

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpGit = require('gulp-git');

var _gulpGit2 = _interopRequireDefault(_gulpGit);

var _gulpBump = require('gulp-bump');

var _gulpBump2 = _interopRequireDefault(_gulpBump);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpMocha = require('gulp-mocha');

var _gulpMocha2 = _interopRequireDefault(_gulpMocha);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _webpackStream = require('webpack-stream');

var _webpackStream2 = _interopRequireDefault(_webpackStream);

var _gulpTagVersion = require('gulp-tag-version');

var _gulpTagVersion2 = _interopRequireDefault(_gulpTagVersion);

var _gulpMochaPhantomjs = require('gulp-mocha-phantomjs');

var _gulpMochaPhantomjs2 = _interopRequireDefault(_gulpMochaPhantomjs);

var _webpack_config = require('./webpack_config');

var _webpack_config2 = _interopRequireDefault(_webpack_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }