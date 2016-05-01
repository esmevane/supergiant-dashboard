import React from 'react'

const AlertNotice = ({ children }) =>
  <div className='notice alert'>
    { children }
  </div>

AlertNotice.propTypes = { children: React.PropTypes.node }

export default AlertNotice
