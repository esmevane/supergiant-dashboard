import React from 'react'
import Aside from '../elements/Aside.component'
import TextNote from '../elements/TextNote.component'

const TaskWelcome = () =>
  <Aside size={ 12 }>
    <br />
    <TextNote>
      You don't have any running or failed tasks.
    </TextNote>
  </Aside>

export default TaskWelcome
