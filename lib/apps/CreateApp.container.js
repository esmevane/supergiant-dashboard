import React from 'react'
import { reduxForm, getValues } from 'redux-form'
import { create } from './apps.actions'
import { add } from '../notifications/notifications.actions'
import AppForm from './AppForm.component'

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
    const { fields: { name }, dispatch, errors } = this.props
    const submit = (event) => {
      event.preventDefault()

      if (Reflect.ownKeys(errors).length > 0) {
        for (var error in errors) {
          dispatch(add('error', Reflect.get(errors, error)))
        }
      } else {
        dispatch(create({ name: name.value }))
      }
    }

    return <AppForm submit={ submit } name={ name } />
  }
}

const manifest = { form, fields, getFormState, validate }
const makeForm = reduxForm(manifest)

export default makeForm(CreateApp)
