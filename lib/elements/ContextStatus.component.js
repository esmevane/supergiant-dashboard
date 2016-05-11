import React from 'react'

const ContextStatus = ({ children, className }) =>
  <div className={ `context-status ${className}` }>
    { children }
  </div>

ContextStatus.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextStatus
