import React from 'react'

const ReleaseMount = ({ mount }) =>
  <tr>
    <td>{ mount.get('volume') }</td>
    <td>{ mount.get('path') }</td>
  </tr>

ReleaseMount.propTypes = { mount: React.PropTypes.object.isRequired }

export default ReleaseMount
