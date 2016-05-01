import React from 'react'
import AddIcon from '../elements/AddIcon.component'
import DestroyIcon from '../elements/DestroyIcon.component'
import Column from '../elements/Column.component'
import Fieldset from '../elements/Fieldset.component'
import Line from '../elements/Line.component'
import FeedbackInput from '../elements/FeedbackInput.component'

const variable = React.PropTypes.shape({
  name: React.PropTypes.object.isRequired,
  value: React.PropTypes.object.isRequired
})

const VariableForm = ({ env, index, variable }) =>
  <Line className='table-row'>
    <Column size={ 4 }>
      <FeedbackInput type='text'
                     prompt='variable name'
                     autoFocus='true'
                     value={ variable.name } />
    </Column>
    <Column size={ 7 }>
      <FeedbackInput type='text'
                     prompt='variable value'
                     value={ variable.value } />
    </Column>
    <Column className='text-right' size={ 1 }>
      <DestroyIcon onClick={ () => env.removeField(index) } />
    </Column>
  </Line>

VariableForm.propTypes = {
  env: React.PropTypes.arrayOf(variable.isRequired).isRequired,
  variable: variable.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManageEnv = ({ env }) =>
  <Fieldset className='line-items'>
    <h4>Environment Variables</h4>

    {
      env.map((variable, index) => (
        <VariableForm variable={ variable }
                      key={ index }
                      env={ env }
                      index={ index } />
      ))
    }

    <Line>
      <AddIcon onClick={ () => env.addField() } />
    </Line>
  </Fieldset>

ManageEnv.propTypes = {
  env: React.PropTypes.arrayOf(variable.isRequired).isRequired
}

export default ManageEnv
