import React from 'react'

const ComponentDetailResources = ({ children }) =>
  <div className='component-detail-resources'>
    { children }
  </div>

ComponentDetailResources.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default ComponentDetailResources
