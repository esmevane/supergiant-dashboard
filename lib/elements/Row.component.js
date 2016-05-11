import React from 'react'

const Row = ({ children, className = `` }) =>
  <div className={ `row ${className}` }>
    { children }
  </div>

Row.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default Row
