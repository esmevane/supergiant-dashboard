import React from 'react'
import { reduxForm } from 'redux-form'
import { create } from './components.actions'
import ButtonLink from '../shared/ButtonLink.container'

const form = 'components'
const fields = [ 'name', 'type' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.type) { errors.type = `Type can't be blank` }

  return errors
}

class CreateComponent extends React.Component {
  render() {
    const { fields: { name, type }, appId, dispatch } = this.props
    const submit = (event) => {
      event.preventDefault()

      dispatch(create({ name: name.value, type: type.value, appId }))
    }

    return(
      <form onSubmit={ submit }>
        <fieldset>
          <input type='text' placeholder='Name' { ...name } />
          {
            name.touched && name.error && (
              <div className='form-error'>{ name.error }</div>
            )
          }
          <input type='text' placeholder='Type' { ...type } />
          {
            type.touched && type.error && (
              <div className='form-error'>{ type.error }</div>
            )
          }
          <button type='submit'>Create component</button>
          <ButtonLink to={ `/apps/${appId}` }>Cancel</ButtonLink>
        </fieldset>
      </form>
    )
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateComponent)
