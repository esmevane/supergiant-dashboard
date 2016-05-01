import React from 'react'

const TextNoteDiv = ({ children, className }) =>
  <div className={ `text-note ${className}` }>
    { children }
  </div>

TextNoteDiv.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default TextNoteDiv
