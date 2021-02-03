module.exports = (properties, { of, type }) => {
  properties.forEach(property => {
    if (!of[property]) {
      const name = type ? `the ${ type } object` : 'the object'
      throw new Error(`[assure] No property: '${ property }' is present in ${ name }.`)
    }
  })

  return of
}
