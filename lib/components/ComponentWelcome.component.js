import React from 'react'
import Aside from '../elements/Aside.component'
import TextNote from '../elements/TextNote.component'
import appDefinition from '../apps/apps.definition'
import componentDefinition from './components.definition'

const ComponentWelcome = () =>
  <Aside size={ 12 } className='welcome-component'>
    <TextNote>
      Contratulations, you have a baby <dfn title={ appDefinition }>App!</dfn>
    </TextNote>
    <TextNote>
      Apps need <dfn title={ componentDefinition }>Components</dfn> in
      order to be useful.
      <br />
      Continue to build your App by adding a Component.
    </TextNote>
  </Aside>

export default ComponentWelcome 
