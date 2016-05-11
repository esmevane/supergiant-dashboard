import React from 'react'

const ContextFooter = ({ children, className }) =>
  <footer className={ `context-footer ${className}` }>
    { children }
  </footer>

ContextFooter.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}


export default ContextFooter
