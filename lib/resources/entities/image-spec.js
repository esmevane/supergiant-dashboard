import Immutable from 'immutable'
import kebabCase from 'lodash/kebabCase'
import Image from './image'

describe(`Image`, () => {
  describe(`initializing`, () => {
    const name = `Image Name`
    const image = new Image({ name })

    it(`responds to name`, () => expect(image.name).to.be.ok)
  })

  describe(`id`, () => {
    describe(`when given an id`, () => {
      const id = 1234
      const image = new Image({ id })

      it(`returns the given id`, () => expect(image.id()).to.eql(id))
    })

    describe(`otherwise`, () => {
      const image = new Image({ })

      it(`makes a new id`, () => expect(image.id()).to.be.ok)
    })
  })

  describe(`key`, () => {
    const image = new Image({ })

    it(`returns the id`, () => expect(image.key()).to.eql(image.id()))
  })

  describe(`toPayload`, () => {
    const name = `Super Fancy New Image`
    const image = new Image({ name })
    const payload = image.toPayload()

    it(`contains the given name`, () => expect(payload.name).to.eql(name))
  })

  describe(`updateWith`, () => {
    const payload = { name: `ghost` }
    const params = { name: 'private-repo/ghost' }
    const image = new Image(payload)
    const updated = image.updateWith(params)

    it(`changes the name`, () => expect(updated.name).to.eql(params.name))
  })

  describe(`marshaling from an API`, () => {
    const payload = { name: `ghost` }
    const image = new Image(payload)

    it(`exposes the name`, () => expect(image.name).to.eql(payload.name))
    it(`creates an ID`, () => expect(image.id()).to.be.ok)
  })
})
