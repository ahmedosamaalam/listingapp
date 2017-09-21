import del from 'del'
import git from 'gulp-git'
import bump from 'gulp-bump'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import filter from 'gulp-filter'
import webpack from 'webpack-stream'
import tagVersion from 'gulp-tag-version'
import mochaPhantomJS from 'gulp-mocha-phantomjs'
import webpackConfig from './webpack_config'


export default function (config) {
  let {
    rootDir,
    gulp,
    testEnv,
    webpackNoParse,
    es5mode
  } = config

  var src = `${rootDir}/src`
    , test = `${rootDir}/test`
    , dist = `${rootDir}/dist`
    , lib = `${rootDir}/lib`
    , mochaPhantomConfig = {
      phantomjs: {
        useColors: true,
        settings: {
          webSecurityEnabled: false
        }
      }
    }

  gulp.task('default', ['watch'])

  gulp.task('watch', ['test'], () => {
    gulp.watch([src + '/**/*', test + '/**/*'], ['test'])
  })

  gulp.task('prepublish', ['build'])

  gulp.task('build', ['copy-nonjs', 'build-js'])

  gulp.task('test', [`test-${testEnv}`])

  gulp.task('test-browser', ['webpack'], () =>
    gulp.src(`${test}/runner.html`)
      .pipe(mochaPhantomJS(mochaPhantomConfig))
      .on('error', onerror)
  )

  gulp.task('test-node', ['build'], () => {
    gulp.src([`${test}/**/*.js`])
      .pipe(mocha())
      .on('error', onerror)
  })

  gulp.task("webpack", ['build'], function() {
    let config = webpackConfig({
        rootDir: rootDir,
        noParse: webpackNoParse,
        es5mode: es5mode
      })
      , entry = config.entry
      , output = config.output.path

    return gulp.src(entry)
      .pipe(webpack(config))
      .pipe(gulp.dest(output))
  })

  gulp.task('clean',
    (cb) => del(lib, cb)
  )

  gulp.task('copy-nonjs', ['clean'],
    () => gulp.src([`${src}/**/*`, `!${src}/**/*.js`])
      .pipe(gulp.dest(lib))
  )

  gulp.task('build-js', ['clean'],
    () => {
      if (es5mode)
        return gulp.src(`${src}/**/*.js`)
          .pipe(gulp.dest(lib))
      else
        return gulp.src(`${src}/**/*.js`)
          .pipe(
            babel({
              presets: ['es2015']
            })
          )
          .pipe(gulp.dest(lib))
    }
  )

  /*
   *  gulp patch     # makes v0.1.0 → v0.1.1
   *  gulp feature   # makes v0.1.1 → v0.2.0
   *  gulp release   # makes v0.2.1 → v1.0.0
   */
  gulp.task('patch', () => inc('patch') )
  gulp.task('feature', () => inc('minor') )
  gulp.task('release', () => inc('major') )

  function onerror(err) {
    console.error(err)
    this.emit('end')
  }

  function inc(importance) {
    return gulp.src(['./package.json', './bower.json'])
      .pipe(bump({type: importance}))
      .pipe(gulp.dest('./'))
      .pipe(git.commit('version bump'))
      .pipe(filter('package.json'))
      .pipe(tagVersion({ prefix: '' }))
  }
}
