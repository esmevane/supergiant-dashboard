import React from 'react'
import Row from '../elements/Row.component'
import TableRow from '../elements/TableRow.component'
import { kebabCase } from 'lodash'

const ReleaseOverview = ({ release }) =>
  <TableRow id={ kebabCase(`release-${release.get('timestamp')}`) }>
    <Row className='thin'>
      <h3 className='col-6'>Release Overview</h3>
    </Row>

    <table className='line-items'>
      <thead>
        <tr>
          <th>Instance count</th>
          <th>Containers</th>
          <th>Volumes</th>
          <th>Termination grace period</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ release.get('instance_count') }</td>
          <td>{ release.get('containers').count() }</td>
          <td>{ release.get('volumes').count() }</td>
          <td>{ release.get('termination_grace_period') }</td>
        </tr>
      </tbody>
    </table>
  </TableRow>

ReleaseOverview.propTypes = {
  release: React.PropTypes.object.isRequired
}

export default ReleaseOverview
