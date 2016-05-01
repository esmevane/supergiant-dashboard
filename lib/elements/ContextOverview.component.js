import React from 'react'

const ContextOverview = ({ children }) =>
  <div className='context-overview table-row pad'>
    { children }
  </div>

ContextOverview.propTypes = { children: React.PropTypes.node.isRequired }

export default ContextOverview
