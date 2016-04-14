import React from 'react'
import uuid from 'uuid'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { insert } from '../containers/containers.actions'
import ExpandedContainerForm from './ExpandedContainerForm.component'

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

class CreateContainer extends React.Component {
  render() {
    const {
      appName,
      componentName,
      dispatch,
      errors,
      values,
      fields: {
        image,
        cpu,
        ram,
        mounts,
        ports,
        env
      }
    } = this.props

    const submit = (event) => {
      event.preventDefault()

      if (Reflect.ownKeys(errors).length > 0) {
        for (var error in errors) {
          dispatch(add('error', Reflect.get(errors, error)))
        }
      } else {
        dispatch(insert(uuid.v4(), { ...values, appName, componentName }))
      }
    }

    return(
      <ExpandedContainerForm submit={ submit }
                             image={ image }
                             cpu={ cpu }
                             ram={ ram }
                             mounts={ mounts }
                             ports={ ports }
                             env={ env } />
    )
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateContainer)
