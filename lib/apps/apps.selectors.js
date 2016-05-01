import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const appData = state => state.get('apps')
export const allApps = state => appData(state).get('contents')
export const getApps = state => allApps(state).toList()

export const getCache = state => appData(state).getIn(['meta', 'cache'])
export const getApp = (state, props) =>
  allApps(state).get(
    props.appName ||
    (props.params && props.params.appName)
  )
