import React from 'react'

const ContextOverview = ({ children, className }) =>
  <div className={ `context-overview table-row pad ${className}` }>
    { children }
  </div>

ContextOverview.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ContextOverview
