import React from 'react'

const DeployButton = ({ onClick, children }) =>
  <button onClick={ onClick } className='with-glyph glyph-plus-action-color'>
    { children }
  </button>

DeployButton.propTypes = {
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default DeployButton
