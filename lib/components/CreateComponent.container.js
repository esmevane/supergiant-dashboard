import React from 'react'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { create } from '../components/components.actions'
import CreateComponent from './CreateComponent.component'

const form = 'components'
const fields = [ 'color', 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.color) { errors.color = `Color can't be blank` }

  return errors
}

function mapStateToProps(state, props) { }

function mapDispatchToProps(dispatch, props) {
  const initColor = props => () => {
    if (props.fields) {
      const { fields: { color } } = props
      if (!color.value) { color.onChange('#828') }
    }
  }

  const submit = props => event => {
    const { errors, values } = props
    const { appName } = props.params
    event.preventDefault()

    if (Reflect.ownKeys(errors).length > 0) {
      for (var error in errors) {
        dispatch(add('error', Reflect.get(errors, error)))
      }
    } else {
      dispatch(create({ appName, ...values }))
    }
  }

  return { initColor, submit }
}

const formConfig = { form, fields, getFormState, validate }
const connector = reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export default connector(CreateComponent)
