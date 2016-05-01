import React from 'react'
import ResourceNote from '../elements/ResourceNote.component'
import TextNote from '../elements/TextNote.component'

const ContainerWelcome = () =>
  <ResourceNote>
    <TextNote>
      A Container holds a Docker image with RAM and CPU allocations,
      ports, and environment variables.
    </TextNote>
    <TextNote>
      This Component requires at least one Container to run.
    </TextNote>
  </ResourceNote>

export default ContainerWelcome
