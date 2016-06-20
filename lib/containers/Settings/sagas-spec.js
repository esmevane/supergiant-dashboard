import { takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import * as crud from 'lib/crud-utilities'
import * as Sagas from './sagas'

const Actions = crud.createCrudActions('settings')
const EntrypointActions = crud.createCrudActions('entrypoints')
const RepoActions = crud.createCrudActions('repos')

describe(`Settings sagas`, () => {
  const getState = () => {}

  describe(`.all`, () => {
    const operations = [...Sagas.all(getState)]
    const sequence = [
      fork(Sagas.fetch, getState)
    ]

    it('it forks each saga in the starter sequence', () => {
      for (let step of sequence) { expect(operations).to.include(step) }
    })
  })

  describe(`.fetch`, () => {
    const operations = [...Sagas.fetch(getState)].map(op => op.name)
    const sequence = [
      takeEvery(Actions.Fetch, Sagas.fetchResources, getState).name
    ]

    it(`listens for ${Actions.Fetch} actions`, () => {
      for (let step of sequence) { expect(operations).to.include(step) }
    })
  })

  describe(`.fetchResources`, () => {
    const operations = [...Sagas.fetchResources(getState)]
    const sequence = [
      put(EntrypointActions.fetch()),
      put(RepoActions.fetch())
    ]

    it(`signals a fetch for Entrypoints and Repos`, () => {
      for (let step of sequence) { expect(operations).to.include(step) }
    })

  })
})
