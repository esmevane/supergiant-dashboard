import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getApps } from '../selectors'
import { fetch } from '../apps/apps.actions'
import Apps from './Apps.component'

function mapStateToProps(state, props) {
  return { apps: getApps(state, props) }
}

function mapDispatchToProps(dispatch) {
  let addApp = (event) => {
    event.preventDefault()

    dispatch(push(`/apps/new`))
  }

  let fetchApps = () => dispatch(fetch())

  return { addApp, fetchApps }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apps)
