import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getActiveCloud } from '../selectors'
import Dashboard from './Dashboard.component'

function mapStateToProps(state) { return { } }

function mapDispatchToProps(dispatch) {
  let addApp = (event) => {
    event.preventDefault()

    dispatch(push(`/apps/new`))
  }

  return { addApp }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
