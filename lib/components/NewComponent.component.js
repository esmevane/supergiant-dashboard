import React from 'react'

const NewComponent = ({ click }) =>
  <button className='with-glyph glyph-right-arrow-action-color' onClick={ click }>
    New Component
  </button>

NewComponent.propTypes = { click: React.PropTypes.func.isRequired }

export default NewComponent
