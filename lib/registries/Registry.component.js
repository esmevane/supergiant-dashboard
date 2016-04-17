import React from 'react'

const Registry = ({ registry, destroy }) =>
  <tr>
    <th>{ registry.get('name') }</th>
    <td className='text-right'>
      <a className='glyph glyph-x' href='#' onClick={ destroy } />&nbsp; &nbsp;
    </td>
  </tr>

Registry.propTypes = {
  registry: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Registry
