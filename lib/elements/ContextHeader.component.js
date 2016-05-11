import React from 'react'

const ContextHeader = ({ children, className }) =>
  <header className={ `context-header ${className}` }>
    { children }
  </header>

ContextHeader.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextHeader
