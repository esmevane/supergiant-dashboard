import { fromJS } from 'immutable'
import uuid from 'uuid'
import * as Actions from './apps.actions'
import { meta, contents } from './apps.reducers'

describe(`App reducers`, () => {
  describe(`contents state`, () => {
    const id = uuid.v4()
    const app = fromJS({ name: 'oh-yeah' })

    describe(`inserting an app`, () => {
      const initialState = contents(undefined, {})
      const state = contents(initialState, Actions.insert(id, app))

      it(`adds the app`, () => expect(state.get(id)).to.equal(app))
    })

    describe(`removing an app`, () => {
      const initialState = contents(undefined, {})
      const addedState = contents(initialState, Actions.insert(id, app))
      const state = contents(addedState, Actions.remove(id))

      it(`removes the app`, () => expect(state.get(id)).to.equal(undefined))

    })
  })

  describe(`meta state`, () => {
    describe(`invalidating cache`, () => {
      describe(`with an id`, () => {
        const id = uuid.v4()
        const keypath = [`cache`, id, `valid`]

        it(`happens on an invalidate action`, () => {
          const initialState = meta(undefined, {})
          const invalidated = meta(initialState, Actions.invalidate(id))

          expect(invalidated.getIn(keypath)).to.be.false
        })

        it(`happens on a remove action`, () => {
          const initialState = meta(undefined, {})
          const invalidated = meta(initialState, Actions.remove(id))

          expect(invalidated.getIn(keypath)).to.be.false
        })
      })

      describe(`with no id`, () => {
        const keypath = [`cache`, `__index`, `valid`]

        it(`happens on an invalidate action`, () => {
          const initialState = meta(undefined, {})
          const invalidated = meta(initialState, Actions.invalidate())

          expect(invalidated.getIn(keypath)).to.be.false
        })

        it(`happens on a remove action`, () => {
          const initialState = meta(undefined, {})
          const invalidated = meta(initialState, Actions.remove())

          expect(invalidated.getIn(keypath)).to.be.false
        })
      })
    })

    describe(`validating cache`, () => {
      describe(`with an id`, () => {
        const id = uuid.v4()
        const keypath = [`cache`, id, `valid`]

        it(`happens on a validate action`, () => {
          const initialState = meta(undefined, {})
          const validated = meta(initialState, Actions.validate(id))

          expect(validated.getIn(keypath)).to.be.true
        })

        it(`happens on an insert action`, () => {
          const app = {}
          const initialState = meta(undefined, {})
          const validated = meta(initialState, Actions.insert(id, app))

          expect(validated.getIn(keypath)).to.be.true
        })
      })

      describe(`with no id`, () => {
        const keypath = [`cache`, `__index`, `valid`]

        it(`happens on a validate action`, () => {
          const initialState = meta(undefined, {})
          const validated = meta(initialState, Actions.validate())

          expect(validated.getIn(keypath)).to.be.true
        })

        it(`happens on an insert action`, () => {
          const initialState = meta(undefined, {})
          const validated = meta(initialState, Actions.insert())

          expect(validated.getIn(keypath)).to.be.true
        })
      })
    })
  })
})
