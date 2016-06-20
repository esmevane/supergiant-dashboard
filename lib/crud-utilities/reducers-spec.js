import { fromJS } from 'immutable'
import * as crud from 'lib/crud-utilities'

describe(`createCrudReducers`, () => {
  const name = `papaya`
  const actions = crud.createCrudActions(name)
  const reducer = crud.createCrudReducers(name)
  const state = reducer(fromJS({}), {})

  describe(`initialization`, () => {
    it(`is not requesting`, () => {
      expect(crud.isRequesting(state)).not.to.be.ok
    })

    it(`has no error message`, () => {
      expect(crud.getErrorMessage(state)).not.to.be.ok
    })

    it(`has no items`, () => {
      expect(crud.getRecordCount(state)).to.eql(0)
    })
  })

  describe(`starting a request`, () => {
    const requesting = reducer(state, actions.request())

    it(`is requesting`, () => {
      expect(crud.isRequesting(requesting)).to.be.ok
    })
  })

  describe(`a successful request`, () => {
    const requesting = reducer(state, actions.request())
    const success = reducer(requesting, actions.success())

    it(`is not requesting`, () => {
      expect(crud.isRequesting(success)).not.to.be.ok
    })

    it(`has no error message`, () => {
      expect(crud.getErrorMessage(success)).not.to.be.ok
    })
  })

  describe(`a failed request`, () => {
    const error = `It's an error message!`
    const requesting = reducer(state, actions.request())
    const failure = reducer(requesting, actions.failure(error))

    it(`is not requesting`, () => {
      expect(crud.isRequesting(failure)).not.to.be.ok
    })

    it(`has an error message`, () => {
      expect(crud.getErrorMessage(failure)).to.eql(error)
    })
  })

  describe(`clearing an error message`, () => {
    const error = `It's an error message!`
    const failure = reducer(state, actions.failure(error))
    const cleared = reducer(failure, actions.clear())

    it(`has no error message`, () => {
      expect(crud.getErrorMessage(cleared)).not.to.be.ok
    })
  })

  describe(`inserting a record`, () => {
    const id = 1
    const record = { name: "A record" }
    const inserted = reducer(state, actions.insert(id, record))

    it(`changes the record count`, () => {
      expect(crud.getRecordCount(inserted)).to.equal(1)
    })

    it(`stores the record`, () => {
      expect(crud.getRecord(inserted, 1)).to.equal(record)
    })

    it(`provides a list of records`, () => {
      expect(crud.getRecords(inserted)).to.include(record)
    })
  })

  describe(`removing a record`, () => {
    const id = 1
    const record = { name: "A record" }
    const inserted = reducer(state, actions.insert(id, record))
    const removed = reducer(inserted, actions.remove(id))

    it(`changes the record count`, () => {
      expect(crud.getRecordCount(removed)).to.equal(0)
    })

    it(`stores the record`, () => {
      expect(crud.getRecord(removed, 1)).to.equal(undefined)
    })
  })
})
