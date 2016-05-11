import React from 'react'

const AlertNotice = ({ children, className }) =>
  <div className={ `notice alert ${className}` }>{ children }</div>

AlertNotice.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default AlertNotice
