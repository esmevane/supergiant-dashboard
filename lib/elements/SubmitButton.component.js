import React from 'react'

const classes = `easy block with-glyph glyph-right-arrow-action-color`

const SubmitButton = ({ children, className }) =>
  <button type='submit' className={ `${classes} ${className}` }>
    { children }
  </button>

SubmitButton.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default SubmitButton
