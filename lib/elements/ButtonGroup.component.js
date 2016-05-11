import React from 'react'

const ButtonGroup = ({ children, className }) =>
  <div className={ `button-group ${className}` }>
    { children }
  </div>

ButtonGroup.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default ButtonGroup
