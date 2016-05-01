import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getApps } from './apps.selectors'
import { invalidate } from '../apps/apps.actions'
import Apps from './Apps.component'

function mapStateToProps(state, props) {
  let apps = getApps(state, props)

  return { apps }
}

function mapDispatchToProps(dispatch) {
  let addApp = event => {
    event.preventDefault()

    dispatch(push(`/apps/new`))
  }

  let invalidateCache = () => dispatch(invalidate())

  return { addApp, invalidateCache }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apps)
