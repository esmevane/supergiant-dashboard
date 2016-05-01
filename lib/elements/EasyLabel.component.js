import React from 'react'

const EasyLabel = ({ children, className }) =>
  <label className={ `easy ${className}` }>
    { children }
  </label>

EasyLabel.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default EasyLabel
