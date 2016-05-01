import React from 'react'

const AppDashboardContents = ({ children }) =>
  <div className='dashboard-apps'>{ children }</div>

AppDashboardContents.propTypes = { children: React.PropTypes.node.isRequired }

export default AppDashboardContents
