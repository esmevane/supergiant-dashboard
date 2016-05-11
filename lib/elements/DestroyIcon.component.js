import React from 'react'

const classes = `glyph glyph-x`
const DestroyIcon = ({ onClick, className = `` }) =>
  <button onClick={ onClick } className={ `${classes} ${className}` } />

DestroyIcon.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default DestroyIcon
