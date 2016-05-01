import React from 'react'
import Aside from '../elements/Aside.component'
import TextNote from '../elements/TextNote.component'
import appDefinition from './apps.definition'
import componentDefinition from '../components/components.definition'

const CreateAppOverview = () =>
  <Aside>
    <TextNote>
      An <dfn title={ appDefinition }>Application</dfn> is a domain
      space for a group of <dfn title={ componentDefinition }>Components</dfn>.
      <br />
      Get started by naming your App.
    </TextNote>
  </Aside>

export default CreateAppOverview
