import React from 'react'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { create } from '../components/components.actions'
import ComponentForm from './ComponentForm.component'

const form = 'components'
const fields = [ 'color', 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.color) { errors.color = `Color can't be blank` }

  return errors
}

class CreateComponent extends React.Component {
  render() {
    const {
      dispatch,
      errors,
      fields: { color, name },
      params: { id }
    } = this.props

    const submit = (event) => {
      event.preventDefault()

      if (Reflect.ownKeys(errors).length > 0) {
        for (var error in errors) {
          dispatch(add('error', Reflect.get(errors, error)))
        }
      } else {
        dispatch(create({ appId: id, name: name.value, color: color.value }))
      }
    }

    return <ComponentForm submit={ submit } name={ name } color={ color } />
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateComponent)
