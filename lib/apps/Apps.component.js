import React from 'react'

const Apps = ({ children }) =>
  <div className='dashboard-apps'>
    { children }
  </div>

Apps.propTypes = { children: React.PropTypes.node }

export default Apps
