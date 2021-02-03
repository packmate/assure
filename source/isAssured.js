module.exports = ({ Assertion }, utilities) => {
  Assertion.addMethod('assuredBy', function(task, options = {}) {
    const exclusions = options.exclude || []
    const target = this._obj
    const keys = Object.keys(target).filter(key => !exclusions.includes(key))

    keys.forEach(property => {
      const subject = { ...target }
      delete subject[property]

      try {
        task(subject)
      }

      catch (error) {
        if (error.message.includes('[assure]')) {
          this.assert(
            error.message.includes(`property: '${ property }'`),
            `Expected property: '${ property }' to be assured, but it was not.`,
            `Expected property: '${ property }' not to be assured, but it was.`,
          )

          return
        }
      }

      this.assert(
        false,
        `Expected property: '${ property }' to be assured when passing ${ JSON.stringify(subject) }.`
      )
    })
  })

  Assertion.addMethod('assuredByAsync', async function(task, options = {}) {
    const exclusions = options.exclude || []
    const target = this._obj
    const keys = Object.keys(target).filter(key => !exclusions.includes(key))

    await Promise.all(keys.map(async (property) => {
      const subject = { ...target }
      delete subject[property]

      try {
        await task(subject)
      }

      catch (error) {
        if (error.message.includes('[assure]')) {
          this.assert(
            error.message.includes(`property: '${ property }'`),
            `Expected property: '${ property }' to be assured, but it was not.`,
            `Expected property: '${ property }' not to be assured, but it was.`,
          )

          return
        }
      }

      this.assert(
        false,
        `Expected property: '${ property }' to be assured when passing ${ JSON.stringify(subject) }.`
      )
    }))
  })
}
