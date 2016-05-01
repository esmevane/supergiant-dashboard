import React from 'react'

const classes = `glyph glyph-plus`
const AddIcon = ({ onClick }) =>
  <button onClick={ onClick } className={ classes } />

AddIcon.propTypes = { onClick: React.PropTypes.func.isRequired }

export default AddIcon
