import { fromJS } from 'immutable'
import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import { go } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'

class MockResourceClient {
  constructor({ client, scope, route, resource } = {}) {
    this.client = client
    this.route = route
    this.resource = resource
  }

  get(id) { this.getCalledWith = id }
  fetch() { this.fetchCalled = true }
  create(params) {
    this.createCalledWith = params

    return { key: () => params.id }
  }

  update(record) {
    this.updateCalledWith = record

    return record
  }

  delete(id) { this.deleteCalledWith = id }
}

describe(`createCrudSagas`, () => {
  const getState = {}
  const name = `mango`
  const Actions = crud.createCrudActions(name)
  const Sagas = crud.createCrudSagas(name, new MockResourceClient)

  describe(`all`, () => {
    const operations = [...Sagas.all(getState)]
    const sequence = [
      fork(Sagas.create, getState),
      fork(Sagas.get, getState),
      fork(Sagas.destroy, getState),
      fork(Sagas.fetch, getState),
      fork(Sagas.update, getState),
    ]

    it('it forks each saga in the starter sequence', () => {
      for (let step of sequence) { expect(operations).to.include(step) }
    })
  })

  describe(`createRecord`, () => {
    const record = {}
    const params = {}
    const Client = new MockResourceClient

    describe(`happy path`, () => {
      const saga = Sagas.createRecord(getState, { params })

      it(`starts a request, calls create, and redirects`, () => {
        expect(saga.next().value).to.eql(put(Actions.request()))
        expect(saga.next().value).to.eql(call(Sagas.delay))

        expect(saga.next().value).to.eql(
          call([ Client, Client.create], params)
        )

        expect(saga.next().value).to.eql(put(Actions.success()))
        expect(saga.next().value).to.eql(put(go(-1)))
      })
    })

    describe(`sad path`, () => {
      const message = `Oh nooooooo`
      const error = new Error(message)
      const saga = Sagas.createRecord(getState, { params, before })

      it(`reports the failure and forks clearMessages`, () => {
        saga.next()

        expect(saga.throw(error).value).to.eql(put(Actions.failure(error)))
        expect(saga.next().value).to.eql(fork(Sagas.clearMessages))
      })
    })
  })

  describe(`updateRecord`, () => {
    const id = 1
    const record = fromJS({ key: () => id, tags: {} })
    const params = {}
    const reducer = crud.createCrudReducers(name)
    const state = reducer(undefined, Actions.insert(id, record))
    const getState = () => fromJS({ [name]: state })
    const Client = new MockResourceClient

    record.updateWith = () => record

    describe(`happy path`, () => {
      const saga = Sagas.updateRecord(getState, { id, params })

      it(`starts a request, calls update, and redirects`, () => {
        expect(saga.next().value).to.eql(put(Actions.request()))
        expect(saga.next().value).to.eql(call(Sagas.delay))

        expect(saga.next().value).to.eql(
          call([ Client, Client.update], record)
        )

        expect(saga.next().value).to.eql(put(Actions.success()))
        expect(saga.next().value).to.eql(put(go(-1)))
      })
    })

    describe(`sad path`, () => {
      const message = `Oh nooooooo`
      const error = new Error(message)
      const saga = Sagas.updateRecord(getState, { id, params })

      it(`reports the failure and forks clearMessages`, () => {
        saga.next()

        expect(saga.throw(error).value).to.eql(put(Actions.failure(error)))
        expect(saga.next().value).to.eql(fork(Sagas.clearMessages))
      })
    })
  })

  describe(`fetchRecords`, () => {
    const reducer = crud.createCrudReducers(name)
    const Client = new MockResourceClient
    const record = { key: () => 1 }
    const records = [record]

    describe(`happy path`, () => {
      const saga = Sagas.fetchRecords(getState)

      it(`starts a request, calls fetch, and inserts response`, () => {
        expect(saga.next().value).to.eql(put(Actions.request()))
        expect(saga.next().value).to.eql(call(Sagas.delay))
        expect(saga.next().value).to.eql(call([ Client, Client.fetch ]))

        expect(saga.next(records).value).to.eql(
          put(Actions.insert(record.key(), record))
        )

        expect(saga.next().value).to.eql(put(Actions.success()))
      })
    })

    describe(`sad path`, () => {
      const message = `Oh nooooooo`
      const error = new Error(message)
      const saga = Sagas.fetchRecords(getState)

      it(`reports the failure and forks clearMessages`, () => {
        saga.next()

        expect(saga.throw(error).value).to.eql(put(Actions.failure(error)))
        expect(saga.next().value).to.eql(fork(Sagas.clearMessages))
      })
    })
  })

  describe(`retrieveRecord`, () => {
    const reducer = crud.createCrudReducers(name)
    const Client = new MockResourceClient
    const id = 1
    const record = { key: () => id }

    describe(`happy path`, () => {
      const saga = Sagas.retrieveRecord(getState, { id })

      it(`starts a request, calls get, and inserts the response`, () => {
        expect(saga.next().value).to.eql(put(Actions.request()))
        expect(saga.next().value).to.eql(call(Sagas.delay))
        expect(saga.next().value).to.eql(call([ Client, Client.get ], id))

        expect(saga.next(record).value).to.eql(
          put(Actions.insert(record.key(), record))
        )

        expect(saga.next().value).to.eql(put(Actions.success()))
      })
    })

    describe(`sad path`, () => {
      const message = `Oh nooooooo`
      const error = new Error(message)
      const id = 1
      const saga = Sagas.retrieveRecord(getState, { id })

      it(`reports the failure and forks clearMessages`, () => {
        saga.next()

        expect(saga.throw(error).value).to.eql(put(Actions.failure(error)))
        expect(saga.next().value).to.eql(fork(Sagas.clearMessages))
      })
    })
  })

  describe(`removeRecord`, () => {
    const reducer = crud.createCrudReducers(name)
    const Client = new MockResourceClient
    const id = 1
    const record = { key: () => id }

    describe(`happy path`, () => {
      const saga = Sagas.removeRecord(getState, { id })

      it(`starts a request, calls delete, and redirects`, () => {
        expect(saga.next().value).to.eql(put(Actions.request()))
        expect(saga.next().value).to.eql(call(Sagas.delay))
        expect(saga.next().value).to.eql(call([ Client, Client.delete ], id))
        expect(saga.next().value).to.eql(put(Actions.remove(id)))
        expect(saga.next().value).to.eql(put(Actions.success()))
      })
    })

    describe(`sad path`, () => {
      const message = `Oh nooooooo`
      const error = new Error(message)
      const id = 1
      const saga = Sagas.removeRecord(getState, { id })

      it(`reports the failure and forks clearMessages`, () => {
        saga.next()

        expect(saga.throw(error).value).to.eql(put(Actions.failure(error)))
        expect(saga.next().value).to.eql(fork(Sagas.clearMessages))
      })
    })
  })

  describe(`clearMessages`, () => {
    const saga = Sagas.clearMessages()

    it(`calls delay and then clears`, () => {
      expect(saga.next().value).to.eql(call(Sagas.delay, 3000))
      expect(saga.next().value).to.eql(put(Actions.clear()))
    })
  })

  describe(`create`, () => {
    const getState = () => {}
    const saga = Sagas.create(getState)
    const effect = takeEvery(Actions.Create, Sagas.createRecord, getState)

    it(`observes ${Actions.Create} with createRecord`, () => {
      expect(saga.next().value.name).to.eql(effect.name)
    })
  })

  describe(`get`, () => {
    const getState = () => {}
    const saga = Sagas.get(getState)
    const effect = takeEvery(Actions.Get, Sagas.retrieveRecord, getState)

    it(`observes ${Actions.Get} with retrieveRecord`, () => {
      expect(saga.next().value.name).to.eql(effect.name)
    })
  })

  describe(`fetch`, () => {
    const getState = () => {}
    const saga = Sagas.fetch(getState)
    const effect = takeEvery(Actions.Fetch, Sagas.fetchRecords, getState)

    it(`observes ${Actions.Fetch} with fetchRecords`, () => {
      expect(saga.next().value.name).to.eql(effect.name)
    })
  })

  describe(`destroy`, () => {
    const getState = () => {}
    const saga = Sagas.destroy(getState)
    const effect = takeEvery(Actions.Destroy, Sagas.removeRecord, getState)

    it(`observes ${Actions.Destroy} with removeRecord`, () => {
      expect(saga.next().value.name).to.eql(effect.name)
    })
  })

  describe(`update`, () => {
    const getState = () => {}
    const saga = Sagas.update(getState)
    const effect = takeEvery(Actions.Update, Sagas.updateRecord, getState)

    it(`observes ${Actions.Update} with updateRecord`, () => {
      expect(saga.next().value.name).to.eql(effect.name)
    })
  })

})
