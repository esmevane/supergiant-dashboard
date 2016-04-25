import React from 'react'

const ReleaseHardware = ({ cpu, ram }) =>
  <table className='line-items'>
    <thead>
    <tr>
      <th>CPU Min</th>
      <th>CPU Max</th>
      <th>RAM Min</th>
      <th>RAM Max</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{ cpu.get('min') }</td>
      <td>{ cpu.get('max') }</td>
      <td>{ ram.get('min') }</td>
      <td>{ ram.get('max') }</td>
    </tr>
    </tbody>
  </table>


ReleaseHardware.propTypes = {
  cpu: React.PropTypes.object.isRequired,
  ram: React.PropTypes.object.isRequired
}

export default ReleaseHardware
