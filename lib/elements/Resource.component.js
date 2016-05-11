import React from 'react'

const Resource = ({ children, className = `` }) =>
  <li className={ `resource ${className}` }>
    { children }
  </li>

Resource.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default Resource
