import React from 'react'
import Aside from '../elements/Aside.component'
import TextNote from '../elements/TextNote.component'
import Instance from './Instance.component'

const InstanceWelcome = () =>
  <Aside size={ 12 }>
    <TextNote>
      When this Component is running, Container Instance stats will
      be shown here.
    </TextNote>
    <TextNote>
      You have no running instances.
    </TextNote>
  </Aside>

export default InstanceWelcome
