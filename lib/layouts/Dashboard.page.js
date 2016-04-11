import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createOrderedAppsSelector } from '../selectors'
import Dashboard from './Dashboard.component'

function mapStateToProps(state) {
  let getOrderedApps = createOrderedAppsSelector()
  return { apps: getOrderedApps(state) }
}

function mapDispatchToProps(dispatch) {
  let addApp = (event) => {
    event.preventDefault()

    dispatch(push(`/apps/new`))
  }

  return { addApp }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
