import React from 'react'
import { fromJS } from 'immutable'
import ReleaseMount from './ReleaseMount.component'

const ReleaseMounts = ({ mounts = fromJS([]) }) =>
  <div>
    <h5>Mounts</h5>
    {
      mounts.count() == 0 && (
        <p className='text-note'>No volumes defined.</p>
      )
    }
    {
      mounts.count() > 0 && (
        <table>
          <thead>
            <tr>
              <th>Volume name</th>
              <th>Mounted on</th>
            </tr>
          </thead>
          <tbody>
          {
            mounts.map((mount, index) => (
              <ReleaseMount mount={ mount } key={ index } />
            ))
          }
          </tbody>
        </table>
      )
    }
  </div>

ReleaseMount.propTypes = { mounts: React.PropTypes.object.isRequired }

export default ReleaseMount
