import React from 'react'
import Aside from '../elements/Aside.component'
import TextNote from '../elements/TextNote.component'

const RegistryWelcome = () =>
  <Aside size={ 12 }>
    <br />
    <TextNote>
      You don't have any Repository keys set for your application yet.
    </TextNote>
    <TextNote>
      A Repository key is required to connect to a private Docker
      Repository.
    </TextNote>
  </Aside>

export default RegistryWelcome
