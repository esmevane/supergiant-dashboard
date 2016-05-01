import React from 'react'

const Column = ({ children, className, size = 3 }) =>
  <div className={ `col-${size} ${className}` }>
    { children }
  </div>

Column.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  size: React.PropTypes.number
}

export default Column
