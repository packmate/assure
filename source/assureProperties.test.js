describe('assureProperties()', () => {
  const assureProperties = require('./assureProperties')

  context('with an object containing all the given properties', () => {
    const complete = { 'a': 1, 'b': 2 }

    it('does not throw an error', () => {
      expect(() => {
        assureProperties([ 'a', 'b' ], { of: complete })
      }).not.to.throw()
    })

    it('returns the targeted object', () => {
      const result = assureProperties([ 'a', 'b' ], { of: complete })
      expect(result).to.eq(complete)
0   })
  })

  context('with an object not containing all the given properties', () => {
    const incomplete = {}

    it('throws an error', () => {
      expect(() => {
        assureProperties([ 'a', 'b' ], { of: incomplete })
      }).to.throw()
    })

    it('includes [assure] in the error message', () => {
      expect(() => {
        assureProperties([ 'a', 'b' ], { of: incomplete })
      }).to.throw('[assure]')
    })

    context('without a type', () => {
      it('includes the nonexistent property in the error message', () => {
        expect(() => {
          assureProperties([ 'property-one' ], { of: incomplete })
        }).to.throw(/property: 'property-one'.*the object/)
      })
    })

    context('with a type', () => {
      it('includes the nonexistent property and the object type in the error message', () => {
        expect(() => {
          assureProperties([ 'property-one' ], { of: incomplete, type: 'incomplete' })
        }).to.throw(/property: 'property-one'.*incomplete/)
      })
    })
  })
})
