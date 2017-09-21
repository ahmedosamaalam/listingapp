import es6Lib from '../src/index'
import { expect }  from 'chai'

describe('es6-lib basics', function () {
  it('should exist', function () {
    expect(es6Lib).to.be.function
  })
})
