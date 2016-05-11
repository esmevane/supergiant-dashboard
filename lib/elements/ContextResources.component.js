import React from 'react'

const ContextResources = ({ children, className }) =>
  <div className={ `context-system-resources ${className}` }>
    { children }
  </div>

ContextResources.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextResources
