import React from 'react'

const ReleaseVolume = ({ volume }) =>
  <tr>
    <td>{ volume.get('name') }</td>
    <td>{ volume.get('size') }</td>
    <td>{ volume.get('type') }</td>
  </tr>

ReleaseVolume.propTypes = { volume: React.PropTypes.object.isRequired }

export default ReleaseVolume
