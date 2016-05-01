import React from 'react'

const ContextResources = ({ children }) =>
  <div className='context-system-resources'>{ children }</div>

ContextResources.propTypes = { children: React.PropTypes.node }

export default ContextResources
