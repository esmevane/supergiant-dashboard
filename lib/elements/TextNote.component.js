import React from 'react'

const TextNote = ({ children, className }) =>
  <p className={ `text-note ${className}` }>
    { children }
  </p>

TextNote.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default TextNote
