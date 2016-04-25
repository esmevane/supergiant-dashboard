import React from 'react'
import ReleaseVariables from './ReleaseVariables.component'
import ReleaseMounts from './ReleaseMounts.component'
import ReleasePorts from './ReleasePorts.component'
import ReleaseHardware from './ReleaseHardware.component'
import { kebabCase } from 'lodash'

const ReleaseContainer = ({ container, release }) =>
  <div id={
    kebabCase(`${release.get('timestamp')}-${container.get('image')}`)
  }>
    <h4 className='with-icon icon-city'>{ container.get('image') }</h4>
    <ReleaseHardware cpu={ container.get('cpu') } ram={ container.get('ram')} />
    <ReleaseVariables env={ container.get('env') } />
    <ReleaseMounts mounts={ container.get('mounts') } />
    <ReleasePorts ports={ container.get('ports') } />
  </div>

ReleaseContainer.propTypes = {
  container: React.PropTypes.object.isRequired,
  release: React.PropTypes.object.isRequired
}

export default ReleaseContainer
