import React from 'react'
import { connect } from 'react-redux'
import { getActiveCloud } from '../selectors'
import DashboardDetail from './DashboardDetail.component'

function mapStateToProps(state) {
  const cloud = getActiveCloud(state)

  return { cloud }
}

export default connect(mapStateToProps)(DashboardDetail)
