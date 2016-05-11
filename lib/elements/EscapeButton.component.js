import React from 'react'

const EscapeButton = ({ className = ``, onClick }) =>
  <button className={ `esc ${className}` } onClick={ onClick } />

EscapeButton.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default EscapeButton
