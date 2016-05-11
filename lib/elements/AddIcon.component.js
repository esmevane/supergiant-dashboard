import React from 'react'

const AddIcon = ({ className, onClick }) =>
  <button onClick={ onClick } className={ `glyph glyph-plus ${className}` } />

AddIcon.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

export default AddIcon
