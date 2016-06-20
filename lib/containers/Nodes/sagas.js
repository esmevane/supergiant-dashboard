import Nodes from 'resources/nodes'
import * as crud from 'lib/crud-utilities'

export const { all } = crud.createCrudSagas('nodes', new Nodes)
