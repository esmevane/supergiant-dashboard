import React from 'react'

const Entrypoint = ({ destroy, entrypoint }) =>
  <div className='table-row'>
    <div className='col-4'>{ entrypoint.get('domain') }</div>
    <div className='col-4'>
      <a href={ entrypoint.get('address') } target='_blank'>
        { entrypoint.get('address') }
      </a>
      &nbsp;
    </div>
    <div className='col-2'>
      <a href='#' onClick={ e => e.preventDefault() }>
        E
      </a>
      &nbsp;
      <a href='#' onClick={ destroy }>
        X
      </a>
    </div>
  </div>

Entrypoint.propTypes = {
  destroy: React.PropTypes.func.isRequired,
  entrypoint: React.PropTypes.object.isRequired
}

export default Entrypoint
