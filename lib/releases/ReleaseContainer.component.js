import React from 'react'
import { fromJS } from 'immutable'
import { kebabCase } from 'lodash'
import ReleaseVariables from './ReleaseVariables.component'
import ReleaseMounts from './ReleaseMounts.component'
import ReleasePorts from './ReleasePorts.component'
import ReleaseHardware from './ReleaseHardware.component'

const idFor = (release, container) =>
  kebabCase(`${release.get('timestamp')}-${container.get('image')}`)

const ReleaseContainer = ({ container, release }) =>
  <div id={ idFor(release, container) }>
    <h4 className='with-icon icon-city'>{ container.get('image') }</h4>
    <ReleaseHardware cpu={ container.get('cpu') || fromJS({}) }
                     ram={ container.get('ram') || fromJS({}) } />
    <ReleaseVariables env={ container.get('env') || fromJS([]) } />
    <ReleaseMounts mounts={ container.get('mounts') || fromJS([]) } />
    <ReleasePorts ports={ container.get('ports') || fromJS([]) } />
  </div>

ReleaseContainer.propTypes = {
  container: React.PropTypes.object.isRequired,
  release: React.PropTypes.object.isRequired
}

export default ReleaseContainer
