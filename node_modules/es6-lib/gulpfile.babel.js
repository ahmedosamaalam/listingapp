import gulp from 'gulp'
import es6lib from './src/index'

es6lib({
  gulp: gulp,
  rootDir: __dirname,
  testEnv: 'node'
})
