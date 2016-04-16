import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

const variable = React.PropTypes.shape({
  name: React.PropTypes.object.isRequired,
  value: React.PropTypes.object.isRequired
})

const VariableForm = ({ env, index, variable }) =>
  <div className='table-row'>
    <div className='col-4'>
      <FeedbackInput type='text'
                     prompt='variable name'
                     autoFocus='true'
                     value={ variable.name } />
    </div>
    <div className='col-5'>
      <FeedbackInput type='text'
                     prompt='variable value'
                     value={ variable.value } />
    </div>
    <div className='col-2'>
      <button className='glyph glyph-x' onClick={
        event => {
          event.preventDefault()
          env.removeField(index)
        }
      } />
    </div>
  </div>

VariableForm.propTypes = {
  env: React.PropTypes.arrayOf(variable.isRequired).isRequired,
  variable: variable.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManageEnv = ({ env }) =>
  <fieldset className='materials-card col-6'>
    <label className='easy'>Environment Variables</label>

    {
      !!env.length && (
        <div className='table-row'>
          <div className='col-4'>Name</div>
          <div className='col-5'>Value</div>
        </div>
      )
    }

    {
      env.map((variable, index) => (
        <VariableForm variable={ variable }
                 key={ index }
                 env={ env }
                 index={ index } />
      ))
    }

    <div>
      <button className='glyph glyph-plus' onClick={
        event => {
          event.preventDefault()
          env.addField()
        }
      } />
    </div>
  </fieldset>

ManageEnv.propTypes = {
  env: React.PropTypes.arrayOf(variable.isRequired).isRequired
}

export default ManageEnv
