const assureProperties = require('./assureProperties')
const chai = require('chai')
const isAssured = require('./isAssured')

const { expect } = chai

// ---------------------------------------------

chai.use(isAssured)

// ---------------------------------------------

describe('.assuredBy()', () => {
  context('with a function that assures the correct properties', () => {
    describe('the affirmative assertion', () => {
      it('succeeds', () => {
        expect({ a: 1, b: 2 }).to.be.assuredBy(invalidObject => {
          assureProperties([ 'a', 'b' ], { of: invalidObject })
        })
      })

      it('succeeds with exclusions', () => {
        expect({ a: 1, b: 2 }).to.be.assuredBy(invalidObject => {
          assureProperties([ 'a' ], { of: invalidObject })
        }, { exclude: [ 'b' ] })
      })
    })

    describe('the negative assertion', () => {
      it('fails', () => {
        expect(() => {
          expect({ a: 1, b: 2 }).not.to.be.assuredBy(invalidObject => {
            assureProperties([ 'a', 'b' ], { of: invalidObject })
          })
        }).to.throw("Expected property: 'a' not to be assured")
      })
    })
  })

  context('with a function that does not assure the correct properties', () => {
    describe('the negative assertion', () => {
      it('succeeds', () => {
        const object = { a: 1, b: 2 }

        expect(object).not.to.be.assuredBy(invalidObject => {
          assureProperties([ 'c' ], { of: invalidObject })
        })
      })

      it('succeeds with exclusions', () => {
        const object = { a: 1, b: 2 }

        expect(object).not.to.be.assuredBy(invalidObject => {
          assureProperties([ 'c' ], { of: invalidObject })
        }, { exclude: [ 'a' ] })
      })
    })

    describe('the affirmative assertion', () => {
      it('fails', () => {
        const object = { a: 1, b: 2 }

        expect(() => {
          expect(object).to.be.assuredBy(invalidObject => {
            assureProperties([ 'c' ], { of: invalidObject })
          })
        }).to.throw("Expected property: 'a' to be assured")
      })
    })
  })
})

describe('.assuredByAsync()', () => {
  context('with a function that assures the correct properties', () => {
    describe('the affirmative assertion', () => {
      it('succeeds', async () => {
        await expect({ a: 1, b: 2 }).to.be.assuredByAsync(async (invalidObject) => {
          await assureProperties([ 'a', 'b' ], { of: invalidObject })
        })
      })

      it('succeeds with exclusions', async () => {
        await expect({ a: 1, b: 2 }).to.be.assuredByAsync(async (invalidObject) => {
          await assureProperties([ 'a' ], { of: invalidObject })
        }, { exclude: [ 'b' ] })
      })
    })

    describe('the negative assertion', () => {
      it('fails', async () => {
        try {
          await expect({ a: 2, b: 2 }).not.to.be.assuredByAsync(async (invalidObject) => {
            await assureProperties([ 'a', 'b' ], { of: invalidObject })
          })
        }

        catch (error) {
          expect(error.message).to.include("Expected property: 'a' not to be assured")
          return
        }

        throw new Error('Expected a test failure.')
      })
    })
  })

  context('with a function that does not assure the correct properties', () => {
    describe('the negative assertion', () => {
      it('succeeds', async () => {
        await expect({ a: 1, b: 2 }).not.to.be.assuredByAsync(async (invalidObject) => {
          await assureProperties([ 'c' ], { of: invalidObject })
        })
      })

      it('succeeds with exclusions', async () => {
        await expect({ a: 1, b: 2 }).not.to.be.assuredBy(async (invalidObject) => {
          await assureProperties([ 'c' ], { of: invalidObject })
        }, { exclude: [ 'a' ] })
      })
    })

    describe('the affirmative assertion', () => {
      it('fails', async () => {
        try {
          await expect({ a: 1, b: 2 }).to.be.assuredByAsync(async (invalidObject) => {
            assureProperties([ 'c' ], { of: invalidObject })
          })
        }

        catch (error) {
          expect(error.message).to.include("Expected property: 'a' to be assured")
          return
        }

        throw new Error('Expected a test failure.')
      })
    })
  })
})
