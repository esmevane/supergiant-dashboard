import React from 'react'

const Volume = ({ destroy, volume }) =>
  <article className='table-row lined'>
    <div className='col-7 lined'>
      <h4>{ volume.get('name') }</h4>
      <p className='text-note'>{ volume.get('type') }</p>
    </div>

    <div className='col-3'>
      <h4>({ volume.get('size') } GB)</h4>
    </div>

    <div className='col-2 text-right'>
      <button className='glyph glyph-x'
              onClick={ destroy } />&nbsp; &nbsp;
    </div>
  </article>

Volume.propTypes = {
  volume: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Volume
