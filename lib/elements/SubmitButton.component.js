import React from 'react'

const classes = `easy block with-glyph glyph-right-arrow-action-color`

const SubmitButton = ({ children }) =>
  <button type='submit' className={ classes }>
    { children }
  </button>

SubmitButton.propTypes = { children: React.PropTypes.node.isRequired }

export default SubmitButton
