import React from 'react'

const ResourceList = ({ children, className = `` }) =>
  <ul className={ `resources-list ${className}` }>
    { children }
  </ul>

ResourceList.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default ResourceList
