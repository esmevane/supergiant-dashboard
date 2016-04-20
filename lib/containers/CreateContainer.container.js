import React from 'react'
import uuid from 'uuid'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { get } from '../components/components.actions'
import { insert } from '../containers/containers.actions'
import CreateContainer from './CreateContainer.component'
import { createAppAndComponentSelector } from '../selectors.js'

const fields = [
  'image',
  'cpu.min',
  'cpu.max',
  'ram.min',
  'ram.max',
  'mounts[].volume',
  'mounts[].path',
  'ports[].protocol',
  'ports[].number',
  'ports[].public',
  'ports[].external_number',
  'ports[].entrypoint_domain',
  'env[].name',
  'env[].value'
]

const form = 'containers'
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = values => {
  let errors = {}

  if (!values.image) { errors.image = `Image can't be blank` }

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
export default connector(CreateContainer)
