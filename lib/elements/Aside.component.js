import React from 'react'

const Aside = ({ children, className, size = 3 }) =>
  <aside className={ `col-${size} ${className}` }>
    { children }
  </aside>

Aside.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  size: React.PropTypes.number
}

export default Aside
