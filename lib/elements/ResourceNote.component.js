import React from 'react'

const ResourceNote = ({ children }) =>
  <article className='resource-note'>{ children }</article>

ResourceNote.propTypes = { children: React.PropTypes.node.isRequired }

export default ResourceNote
