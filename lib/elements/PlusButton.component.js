import React from 'react'

const PlusButton = ({ children, className = ``, onClick }) => {
  const classes = `with-glyph glyph-plus-action-color ${className}`

  return(
    <button onClick={ onClick } className={ classes }>
      { children }
    </button>
  )
}

PlusButton.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default PlusButton
