import React from 'react'

const ContextTitle = ({ children }) =>
  <div className='context-title'>{ children }</div>

ContextTitle.propTypes = { children: React.PropTypes.node.isRequired }

export default ContextTitle
