import React from 'react'

const classes = ({ isAction, hasGlyph, isTransparent }) =>
  `${backgrounds(isTransparent)} ${glyphs(hasGlyph)} ${actions(isAction)}`

const actions = isAction =>
  isAction ? `glyph-right-arrow-action-color` : `glyph-right-arrow`

const backgrounds = isTransparent => isTransparent ? `transparent` : ``
const glyphs = noGlyph => noGlyph ? `` : `with-glyph`

const ActionButton =
  ({ isAction, onClick, children, className, isTransparent }) =>
    <button onClick={ onClick }
            className={
              `${classes({ isAction, isTransparent })} ${className}`
            }>
      { children }
    </button>

ActionButton.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  isAction: React.PropTypes.bool,
  isTransparent: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default ActionButton
