import React from 'react'

const classes = `glyph glyph-x`
const DestroyIcon = ({ onClick }) =>
  <button onClick={ onClick } className={ classes } />

DestroyIcon.propTypes = { onClick: React.PropTypes.func.isRequired }

export default DestroyIcon
