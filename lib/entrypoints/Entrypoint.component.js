import React from 'react'

const Entrypoint = ({ destroy, entrypoint }) =>
  <tr>
    <th>{ entrypoint.get('domain') }</th>
    <td>
      <a href={ entrypoint.get('address') } target='_blank'>
        { entrypoint.get('address') }
      </a>
      &nbsp;
    </td>
    <td className='text-right'>
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
