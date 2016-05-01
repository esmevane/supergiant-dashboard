import React from 'react'

const ContextStatus = ({ children }) =>
  <div className='context-status'>{ children }</div>

ContextStatus.propTypes = { children: React.PropTypes.node }

export default ContextStatus
