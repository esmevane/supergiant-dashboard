import Images from 'resources/images'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas('images', new Images)
