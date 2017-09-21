# es6-lib [![Build Status](https://travis-ci.org/opudalo/es6-lib.svg?branch=master)](https://travis-ci.org/opudalo/es6-lib)

es6-lib is an enviroment setup for es6 libraries  
a collection of gulp tasks for [es6-lib generator](https://github.com/opudalo/generator-es6-lib)

## Installation

- `npm i --save es6-lib`  

## Examples

```javascript
// gulpfile.js

// NOTE must be es5
var es6lib = require('es6-lib')
var gulp = require('gulp')

es6lib({
  gulp: gulp,
  rootDir: __dirname,
  testEnv: 'node'
})
```

Also, try [es6-lib generator](https://github.com/opudalo/generator-es6-lib)
