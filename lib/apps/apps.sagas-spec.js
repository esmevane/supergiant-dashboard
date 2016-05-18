import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'

import * as Resources from '../resources'
import * as Actions from './apps.actions'
import * as Sagas from './apps.sagas'
import * as NotificationSagas from '../notifications/notifications.sagas'

describe(`App sagas`, () => {
  const getState = () => {}

  describe(`initializer`, () => {
    describe(`all`, () => {
      const operations = [...Sagas.all(getState)]
      const sequence = [
        fork(Sagas.fetch, getState),
        fork(Sagas.get, getState),
        fork(Sagas.create, getState),
        fork(Sagas.destroy, getState),
        fork(Sagas.invalidate, getState)
      ]

      it('it forks each saga in the starter sequence', () => {
        for (let step of sequence) { expect(operations).to.include(step) }
      })
    })
  })

  describe(`observers`, () => {
    const getName = ({ name }) => name

    describe(`fetch`, () => {
      const operations = [ ...Sagas.fetch(getState) ]
      const steps = [ takeEvery(Actions.Fetch, Sagas.fetchApps, getState) ]

      it(`triggers fetchApps on Actions.Fetch`, () => {
        expect(operations.map(getName)).to.eql(steps.map(getName))
      })
    })

    describe(`get`, () => {
      const operations = [ ...Sagas.get(getState) ]
      const steps = [ takeEvery(Actions.Get, Sagas.getApp, getState) ]

      it(`triggers getApp on Actions.Get`, () => {
        expect(operations.map(getName)).to.eql(steps.map(getName))
      })
    })

    describe(`create`, () => {
      const operations = [ ...Sagas.create(getState) ]
      const steps = [ takeEvery(Actions.Create, Sagas.createApp, getState) ]

      it(`triggers createApp on Actions.Create`, () => {
        expect(operations.map(getName)).to.eql(steps.map(getName))
      })
    })

    describe(`destroy`, () => {
      const operations = [ ...Sagas.destroy(getState) ]
      const steps = [ takeEvery(Actions.Destroy, Sagas.deleteApp, getState) ]

      it(`triggers deleteApp on Actions.Destroy`, () => {
        expect(operations.map(getName)).to.eql(steps.map(getName))
      })
    })

    describe(`invalidate`, () => {
      const operations = [ ...Sagas.invalidate(getState) ]
      const steps = [
        takeEvery(Actions.Invalidate, Sagas.invalidateCache, getState)
      ]

      it(`triggers invalidateCache on Actions.Invalidate`, () => {
        expect(operations.map(getName)).to.eql(steps.map(getName))
      })
    })
  })

  describe(`behaviors`, () => {
    describe(`fetchApps`, () => {
      const key = () => 1234
      const app = { key }
      const apps = [ app ]
      const Client = new Resources.Apps

      it(`calls the api and inserts any apps returned`, () => {
        const saga = Sagas.fetchApps(getState)
        const firstStep = saga.next().value
        const secondStep = saga.next(apps).value

        expect(firstStep).to.eql(call([ Client, Client.fetch ]))
        expect(secondStep).to.eql(put(Actions.insert(app.key(), app)))
      })

      it(`reports errors to a notification saga`, () => {
        const saga = Sagas.fetchApps(getState)

        saga.next()

        // In this case we don't care about the specific error message.
        //
        const step = saga.next().value
        const [message] = step.FORK.args
        const expectation = fork(NotificationSagas.errorMessages, message)

        expect(step).to.eql(expectation)
      })
    })
  })
})
