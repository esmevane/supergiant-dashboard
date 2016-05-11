import React from 'react'

const ContextTitle = ({ children, className }) =>
  <div className={ `context-title ${className}` }>
    { children }
  </div>

ContextTitle.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextTitle
