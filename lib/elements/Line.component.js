import React from 'react'

const Line = ({ children, className }) =>
  <div className={ `line ${className}` }>
    { children }
  </div>

Line.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
}

export default Line
