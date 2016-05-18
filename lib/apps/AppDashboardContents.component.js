import React from 'react'

const AppDashboardContents = ({ children, className = `` }) =>
  <div className={ `dashboard-apps ${className}` }>
    { children }
  </div>

AppDashboardContents.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default AppDashboardContents
