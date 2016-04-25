import React from 'react'
import ReleaseVolumes from './ReleaseVolumes.component'
import ReleaseContainers from './ReleaseContainers.component'
import ReleaseOverview from './ReleaseOverview.component'
import { kebabCase } from 'lodash'
import { fromJS } from 'immutable'

const ReleaseDetail = ({ release }) =>
  <div className='release-detail'>
    <div className='release-detail-show'>
      <ReleaseOverview release={ release }/>
      <ReleaseContainers containers={ release.get('containers') }
                         release={ release }/>
      <ReleaseVolumes volumes={ release.get('volumes') } />
    </div>
  </div>

ReleaseDetail.propTypes = { release: React.PropTypes.object.isRequired }

export default ReleaseDetail
