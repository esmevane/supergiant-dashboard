import React from 'react'
import { connect } from 'react-redux'
import DashboardDetail from './DashboardDetail.component'

function mapStateToProps(state) {
  const clouds = state.get('clouds')
  const id = clouds.get('active').first()
  const matches = clouds.get('contents').filter(cloud => cloud.get('id') === id)

  return { cloud: matches.first() }
}

export default connect(mapStateToProps)(DashboardDetail)
