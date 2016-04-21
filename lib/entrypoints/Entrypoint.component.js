import React from 'react'

const Entrypoint = ({ destroy, entrypoint }) =>
  <tr className='table-row'>
    <td className='col-10'>
      <b>{ entrypoint.get('domain') }</b>
      &nbsp; &nbsp; &nbsp;
      <a href={ entrypoint.get('address') } target='_blank'>
        { entrypoint.get('address') }
      </a>
    </td>
    <td className='col-2 text-right'>
      <a href='#' className='glyph glyph-pencil' onClick={ e => e.preventDefault() } />
      &nbsp; &nbsp;
      <a href='#' className='glyph glyph-x' onClick={ destroy } />
      &nbsp; &nbsp;
    </td>
  </tr>

Entrypoint.propTypes = {
  destroy: React.PropTypes.func.isRequired,
  entrypoint: React.PropTypes.object.isRequired
}

export default Entrypoint
