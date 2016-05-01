import React from 'react'
import AddIcon from '../elements/AddIcon.component'
import DestroyIcon from '../elements/DestroyIcon.component'
import Column from '../elements/Column.component'
import Fieldset from '../elements/Fieldset.component'
import Line from '../elements/Line.component'
import FeedbackInput from '../elements/FeedbackInput.component'

const CommandForm = ({ commands, command, index }) =>
  <Line className='table-row'>
    <Column size={ 11 }>
      <FeedbackInput type='text'
                     prompt={ `custom command ${index + 1}` }
                     value={ command } />
    </Column>
    <Column className='text-right' size={ 1 }>
      <DestroyIcon onClick={ () => commands.removeField(index) } />
    </Column>
  </Line>

CommandForm.propTypes = {
  commands: React.PropTypes.arrayOf(
    React.PropTypes.object.isRequired
  ).isRequired,
  command: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManageCommands = ({ commands }) =>
  <Fieldset className='line-items' size={ 12 }>
    <h4>Custom commands</h4>

    {
      commands.map((command, index) => (
        <CommandForm command={ command }
                     key={ index }
                     commands={ commands }
                     index={ index } />
      ))
    }

    <Line>
      <AddIcon onClick={ () => commands.addField() } />
    </Line>
  </Fieldset>

ManageCommands.propTypes = {
  commands: React.PropTypes.arrayOf(
    React.PropTypes.object.isRequired
  ).isRequired
}

export default ManageCommands
