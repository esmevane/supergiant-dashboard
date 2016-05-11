import React from 'react'

const ActionButton = props => {
  const { isAction, onClick, children, className, isTransparent } = props
  const background = isTransparent ? `transparent` : undefined
  const color = isAction
    ? `glyph-right-arrow-action-color`
    : `glyph-right-arrow`

  const classes = [background, color, className].filter(item => !!item)

  return(
    <button onClick={ onClick } className={ classes.join(' ') }>
      { children }
    </button>
  )
}

ActionButton.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  isAction: React.PropTypes.bool,
  isTransparent: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default ActionButton
