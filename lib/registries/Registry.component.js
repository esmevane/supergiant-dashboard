import React from 'react'

const Registry = ({ registry, destroy }) =>
  <div className='table-row'>
    <div className='col-6'>{ registry.get('name') }</div>
    <div className='col-4'>
      <a href='#' onClick={ destroy }>
        Delete key
      </a>
    </div>
  </div>

Registry.propTypes = {
  registry: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Registry
