import React from 'react'

const classes = ({ isAction, hasGlyph, isTransparent }) =>
  `${backgrounds(isTransparent)} ${glyphs(hasGlyph)} ${actions(isAction)}`

const actions = isAction => isAction ? `glyph-x-action-color` : `glyph-x`
const backgrounds = isTransparent => isTransparent ? `transparent` : ``
const glyphs = noGlyph => noGlyph ? `` : `with-glyph`

const DestroyButton = ({ isAction, onClick, children }) =>
  <button onClick={ onClick } className={ classes({ isAction }) }>
    { children }
  </button>

DestroyButton.propTypes = {
  children: React.PropTypes.node.isRequired,
  isAction: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default DestroyButton
