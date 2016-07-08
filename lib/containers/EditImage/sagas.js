import Images from 'resources/images'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas('edit-image', new Images)
