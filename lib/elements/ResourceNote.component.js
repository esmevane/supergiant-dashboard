import React from 'react'

const ResourceNote = ({ children, className = `` }) =>
  <article className={ `resource-note ${className}` }>
    { children }
  </article>

ResourceNote.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ResourceNote
