import React from 'react'

const InlineTextNote = ({ children, className }) =>
  <span className={ `text-note font-size-reset ${className}` }>
    { children }
  </span>

InlineTextNote.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default InlineTextNote
