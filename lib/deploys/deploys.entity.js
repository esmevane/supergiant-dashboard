import { deployRoute, ResourceClient } from '../client'
import { fromJS } from 'immutable'

export const createDeploy = (...pathElements) =>
  new ResourceClient(deployRoute(...pathElements)).create({})
