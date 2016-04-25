import React from 'react'

const ReleasePort = ({ port }) =>
  <tr>
    <td>{ port.get('protocol') }</td>
    <td>{ port.get('public') }</td>
    <td>{ port.get('external_number') }</td>
    <td>{ port.get('number') }</td>
    <td>{ port.get('entrypoint_domain') }</td>
  </tr>

ReleasePort.propTypes = { port: React.PropTypes.object.isRequired }

export default ReleasePort
