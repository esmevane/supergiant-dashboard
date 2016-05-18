import React from 'react'

const AppDashboard = ({ children, className = `` }) =>
  <section className={ `application-dashboard ${className}` }>
    { children }
  </section>

AppDashboard.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default AppDashboard
