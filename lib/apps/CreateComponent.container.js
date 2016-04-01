import React from 'react'
import { reduxForm } from 'redux-form'
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
    const { fields: { color, name }, dispatch, params: { id } } = this.props
    const submit = (event) => {
      event.preventDefault()

      dispatch(create({ appId: id, name: name.value, color: color.value }))
    }

    return <ComponentForm submit={ submit } name={ name } color={ color } />
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateComponent)
