import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const allInstances = state => state.get('instances')

export const getCurrentInstances = (app, component) =>
  (state, props) =>
    allInstances(state, props)
      .filter((instance, key) => (
        key.includes(app.name) && key.includes(component.get('name'))
      ))
      .filter((instance, key) => key.includes(`current`))
      .toList()
