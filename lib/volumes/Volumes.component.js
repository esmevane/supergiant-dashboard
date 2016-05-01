import React from 'react'
import VolumeResources from './VolumeResources.component'
import VolumeWelcome from './VolumeWelcome.component'
import Volume from './Volume.container'
import FadeChange from '../shared/FadeChange.animation'

const Volumes = ({ volumes, handleNew }) =>
  <VolumeResources handleNew={ handleNew }>
    <FadeChange>
      { (volumes.count() === 0) && <VolumeWelcome /> }

      {
        volumes.map((volume, index) => (
          <Volume volume={ volume } key={ index } />
        ))
      }
    </FadeChange>
  </VolumeResources>

Volumes.propTypes = {
  volumes: React.PropTypes.object.isRequired,
  handleNew: React.PropTypes.func.isRequired
}

export default Volumes
