import React from 'react'

const SuccessNotice = ({ children, className = `` }) =>
  <div className={ `notice success ${className}` }>
    { children }
  </div>

SuccessNotice.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default SuccessNotice
