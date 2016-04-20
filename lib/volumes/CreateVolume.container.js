import React from 'react'
import uuid from 'uuid'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { get } from '../components/components.actions'
import { insert } from '../volumes/volumes.actions'
import { createAppAndComponentSelector } from '../selectors.js'
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

function mapStateToProps(state, props) {
  let selector = createAppAndComponentSelector()
  let entities = selector(state, props)

  return { ...entities }
}


function mapDispatchToProps(dispatch, props) {
  const fetchResources = () =>
    dispatch(
      get(props.params.componentName, props.params.appName)
    )

  const submit = props => event => {
    const { errors, values } = props
    const { appName, componentName } = props.params

    event.preventDefault()

    if (Reflect.ownKeys(errors).length > 0) {
      for (var error in errors) {
        dispatch(add('error', Reflect.get(errors, error)))
      }
    } else {
      let id = uuid.v4()
      dispatch(insert(id, { ...values, id, appName, componentName }))
    }
  }

  return { fetchResources, submit }
}

const formConfig = { form, fields, getFormState, validate }
const connector = reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export default connector(CreateVolume)
