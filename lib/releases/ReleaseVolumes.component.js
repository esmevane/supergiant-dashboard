import React from 'react'
import ReleaseVolume from './ReleaseVolume.component'

const ReleaseVolumes = ({ volumes }) =>
  <div className='release-detail-pane collapsible'>
    <h3 className='col-6'>Volumes</h3>
    {
      volumes.count() === 0 && (
        <p className='text-note'>No volumes defined.</p>
      )
    }

    {
      volumes.count() !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Volume name</th>
              <th>Size</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              volumes.map((volume, index) => (
                <ReleaseVolume volume={ volume } key={ index } />
              ))
            }
          </tbody>
        </table>
      )
    }
  </div>

ReleaseVolumes.propTypes = { volumes: React.PropTypes.object.isRequired }

export default ReleaseVolumes
