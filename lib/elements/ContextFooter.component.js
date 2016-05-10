import React from 'react'

const ContextFooter = ({ children, className }) =>
  <footer className={ `context-footer ${className}` }>
    { children }
  </footer>

ContextFooter.propTypes = { children: React.PropTypes.node }


export default ContextFooter
