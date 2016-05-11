import React from 'react'

const Fieldset = ({ children, className = ``, size = 3 }) =>
  <fieldset className={ `col-${size} ${className}` }>
    { children }
  </fieldset>

Fieldset.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  size: React.PropTypes.number
}

export default Fieldset
