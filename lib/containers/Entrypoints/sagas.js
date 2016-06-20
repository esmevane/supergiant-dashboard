import Entrypoints from 'resources/entrypoints'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas(
  'entrypoints',
  new Entrypoints
)
