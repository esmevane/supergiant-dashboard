import React from 'react'
import uuid from 'uuid'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { insert } from '../volumes/volumes.actions'
import CreateVolume from './CreateVolume.component'

const form = 'volumes'
const fields = ['name', 'size', 'type']
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = values => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.size) { errors.size = `Size can't be blank` }
  if (!values.type) { errors.name = `Type can't be blank` }

  return errors
}

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  const submit = props => event => {
    const { errors, values } = props
    const { appName, componentName } = props.params

    event.preventDefault()

    if (Reflect.ownKeys(errors).length > 0) {
      for (var error in errors) {
        dispatch(add('error', Reflect.get(errors, error)))
      }
    } else {
      dispatch(insert(uuid.v4(), { ...values, appName, componentName }))
    }
  }

  return { submit }
}

const formConfig = { form, fields, getFormState, validate }
const connector = reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export default connector(CreateVolume)
