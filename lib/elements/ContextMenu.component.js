import React from 'react'

const ContextMenu = ({ children }) =>
  <menu className='context-menu'>{ children }</menu>

ContextMenu.propTypes = { children: React.PropTypes.node }

export default ContextMenu
