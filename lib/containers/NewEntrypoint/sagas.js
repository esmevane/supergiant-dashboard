import Entrypoints from 'resources/entrypoints'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas(
  'new-entrypoint',
  new Entrypoints
)
