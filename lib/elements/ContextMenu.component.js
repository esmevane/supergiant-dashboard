import React from 'react'

const ContextMenu = ({ children, className }) =>
  <menu className={ `context-menu ${className}` }>{ children }</menu>

ContextMenu.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextMenu
