import React from 'react'

const ContextMenu = ({ children }) =>
  <section className='context-data'>{ children }</section>

ContextMenu.propTypes = { children: React.PropTypes.node }

export default ContextMenu
