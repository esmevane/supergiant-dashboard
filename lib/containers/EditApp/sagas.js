import Apps from 'resources/apps'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas('edit-app', new Apps)
