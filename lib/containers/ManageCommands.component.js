import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

const CommandForm = ({ commands, command, index }) =>
  <div className='table-row line'>
    <div className='col-11'>
      <FeedbackInput type='text'
                     prompt={ `custom command ${index}` }
                     value={ command } />
    </div>
    <div className='col-1 text-right'>
      <button className='glyph glyph-x' onClick={
        event => {
          event.preventDefault()
          commands.removeField(index)
        }
      } />
    </div>
  </div>

CommandForm.propTypes = {
  commands: React.PropTypes.arrayOf(
    React.PropTypes.object.isRequired
  ).isRequired,
  command: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManageCommands = ({ commands }) =>
  <fieldset className='line-items'>
    <h4>Custom commands</h4>

    {
      commands.map((command, index) => (
        <CommandForm command={ command }
                     key={ index }
                     commands={ commands }
                     index={ index } />
      ))
    }

    <div className='line'>
      <button className='glyph glyph-plus' onClick={
        event => {
          event.preventDefault()
          commands.addField()
        }
      } />
    </div>
  </fieldset>

ManageCommands.propTypes = {
  commands: React.PropTypes.arrayOf(
    React.PropTypes.object.isRequired
  ).isRequired
}

export default ManageCommands
