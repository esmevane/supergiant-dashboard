import React from 'react'

const NewComponent = ({ click }) =>
  <button className='glyph-right-arrow' onClick={ click }>
    New Component
  </button>

NewComponent.propTypes = {
  appName: React.PropTypes.string.isRequired,
  click: React.PropTypes.func.isRequired
}

export default NewComponent
