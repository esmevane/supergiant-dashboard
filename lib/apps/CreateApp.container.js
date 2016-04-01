import React from 'react'
import { reduxForm } from 'redux-form'
import { create } from './apps.actions'
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
    const { fields: { name }, dispatch } = this.props
    const submit = (event) => {
      event.preventDefault()

      dispatch(create({ name: name.value }))
    }

    return <AppForm submit={ submit } name={ name } />
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateApp)
