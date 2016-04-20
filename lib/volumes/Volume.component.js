import React from 'react'

const Volume = ({ destroy, volume }) =>
  <article>
    <div className='col-7'>
      <h4>{ volume.get('name') }</h4>
      <p>{ volume.get('type') }</p>
    </div>

    <div className='col-3'>
      <h4>({ volume.get('size') } GB)</h4>
    </div>

    <div className='col-1'>
      <button className='transparent with-glyph glyph-x-action-color'
              onClick={ destroy } />
    </div>
  </article>

Volume.propTypes = {
  volume: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Volume
