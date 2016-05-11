import React from 'react'

const LabelRight = ({ className, children }) =>
  <div className={ `label-right ${className}` }>{ children }</div>

LabelRight.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
}

export default LabelRight
