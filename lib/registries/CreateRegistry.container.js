import React from 'react'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { create } from '../registries/registries.actions'
import CreateRegistry from './CreateRegistry.component'

const form = 'registries'
const fields = [ 'name', 'key' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.key) { errors.key = `Key can't be blank` }

  return errors
}

function mapStateToProps() { return {} }

function mapDispatchToProps(dispatch, props) {
  const submit = props => event => {
    const { errors, values } = props
    event.preventDefault()

    if (Reflect.ownKeys(errors).length > 0) {
      for (var error in errors) {
        dispatch(add('error', Reflect.get(errors, error)))
      }
    } else {
      dispatch(create({ ...values }))
    }
  }

  return { submit }
}

const formConfig = { form, fields, getFormState, validate }
const connector = reduxForm(formConfig, mapStateToProps, mapDispatchToProps)

export default connector(CreateRegistry)
