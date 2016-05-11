import React from 'react'

const ContextMenu = ({ children, className }) =>
  <section className={ `context-data ${className}` }>{ children }</section>

ContextMenu.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextMenu
