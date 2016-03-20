import React from 'react'
import { reduxForm } from 'redux-form'
import ButtonLink from '../shared/ButtonLink.container'
import { create } from './apps.actions'

const form = 'apps'
const fields = [ 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

class CreateApp extends React.Component {
  render() {
    const { fields: { name }, dispatch } = this.props
    const submit = (event) => {
      event.preventDefault()

      dispatch(create({ name: name.value }))
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
          <button type='submit'>Create app</button>
          <ButtonLink to={ `/` }>Cancel</ButtonLink>
        </fieldset>
      </form>
    )
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateApp)
