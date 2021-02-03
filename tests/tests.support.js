const chai = require('chai')

// ---------------------------------------------
// Make specified helper methods available to all tests.

Object.assign(global, {
  expect: chai.expect
})
