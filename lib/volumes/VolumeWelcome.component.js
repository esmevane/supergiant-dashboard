import React from 'react'
import ResourceNote from '../elements/ResourceNote.component'
import TextNote from '../elements/TextNote.component'

const VolumeWelcome = () =>
  <ResourceNote>
    <TextNote>
      A Volume is disk storage that will be mounted on a running
      Container. Not all Containers need them.
    </TextNote>
    <TextNote>
      This Component has no Volumes.
    </TextNote>
  </ResourceNote>

export default VolumeWelcome
