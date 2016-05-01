import React from 'react'
import DestroyIcon from '../elements/DestroyIcon.component'

const Registry = ({ registry, destroy }) =>
  <tr className='table-row'>
    <th className='col-10'>{ registry.get('name') }</th>
    <td className='col-2 text-right'>
      <DestroyIcon onClick={ destroy } />
      &nbsp;
      &nbsp;
    </td>
  </tr>

Registry.propTypes = {
  registry: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Registry
