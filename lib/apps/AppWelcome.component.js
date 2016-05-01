import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import TextNote from '../elements/TextNote.component'
import WelcomeMessage from '../elements/WelcomeMessage.component'

const AppWelcome = ({ addApp }) =>
  <WelcomeMessage>
    <h1>Welcome to Supergiant.</h1>

    <TextNote>
      This is your datacenter dashboard that makes it easy for you
      to manage stateful, distributed apps at any scale.
    </TextNote>

    <TextNote>
      It appears the only app running is the Supergiant dashboard,
      so let's get started.
    </TextNote>

    <div>
      <ActionButton onClick={ addApp }>
        Create My First App
      </ActionButton>
    </div>
  </WelcomeMessage>

AppWelcome.propTypes = { addApp: React.PropTypes.func.isRequired }

export default AppWelcome
