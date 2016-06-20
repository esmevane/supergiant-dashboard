import Repos from 'resources/repos'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas(
  'repos',
  new Repos
)
