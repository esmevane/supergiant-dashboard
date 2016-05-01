import React from 'react'

const AppDashboard = ({ children }) =>
  <section className='application-dashboard'>
    { children }
  </section>

AppDashboard.propTypes = { children: React.PropTypes.node.isRequired }

export default AppDashboard
