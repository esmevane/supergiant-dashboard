import React from 'react'

const DeployButton = props => {
  const { isAction, onClick, children, className, isTransparent } = props
  const background = isTransparent ? `transparent` : undefined
  const color = isAction
    ? `glyph-right-deploy-action-color`
    : `glyph-right-deploy`

  const classes = [background, color, className].filter(item => !!item)

  return(
    <button onClick={ onClick } className={ classes.join(' ') }>
      { children }
    </button>
  )
}

DeployButton.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  isAction: React.PropTypes.bool,
  isTransparent: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default DeployButton
