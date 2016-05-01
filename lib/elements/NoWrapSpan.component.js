import React from 'react'

const NoWrapSpan = ({ children, className }) =>
  <span className={ `nowrap ${className}` }>{ children }</span>

NoWrapSpan.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default NoWrapSpan
