import React from 'react'

const ReleaseVariable = ({ variable }) =>
  <tr>
    <td>{ variable.get('name') }</td>
    <td>{ variable.get('value') }</td>
  </tr>

ReleaseVariable.propTypes = { variable: React.PropTypes.object.isRequired }

export default ReleaseVariable
