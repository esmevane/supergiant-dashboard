import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import Aside from '../elements/Aside.component'
import Column from '../elements/Column.component'
import Row from '../elements/Row.component'
import TextNote from '../elements/TextNote.component'

const ReleaseWelcome = ({ create }) =>
  <article className='releases-welcome'>
    <Row>
      <Column size={ 3 } />

      <Column size={ 3 }>
        <h3>Create your first release.</h3>
      </Column>
    </Row>

    <Row>
      <Column size={ 3 } />

      <Column size={ 3 }>
        <ActionButton isAction={ true } onClick={ create }>
          Create a Release
        </ActionButton>
      </Column>

      <Aside size={ 3 }>
        <TextNote>
          When you are ready to deploy your Component, you need to
          create a new Release.
        </TextNote>
        <TextNote>
          Releases help you keep track of changes to your Component
          each time you deploy it.
        </TextNote>
      </Aside>
    </Row>
  </article>

ReleaseWelcome.propTypes = { create: React.PropTypes.func.isRequired }

export default ReleaseWelcome
