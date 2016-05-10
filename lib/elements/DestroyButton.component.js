import React from 'react'

const classes = ({ isAction, hasGlyph, isTransparent, className }) =>
  `${backgrounds(isTransparent)} ${glyphs(hasGlyph)} ${actions(isAction)} ${className}`

const actions = isAction => isAction ? `glyph-x-action-color` : `glyph-x`
const backgrounds = isTransparent => isTransparent ? `transparent` : ``
const glyphs = noGlyph => noGlyph ? `` : `with-glyph`

const DestroyButton = ({ isAction, onClick, children, className }) =>
  <button onClick={ onClick } className={ classes({ isAction, className }) }>
    { children }
  </button>

DestroyButton.propTypes = {
  children: React.PropTypes.node.isRequired,
  isAction: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default DestroyButton
