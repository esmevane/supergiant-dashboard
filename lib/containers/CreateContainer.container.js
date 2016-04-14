import React from 'react'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { addContainer } from '../components/components.actions'
import ContainerForm from './ContainerForm.component'

const form = 'containers'
const fields = [ 'dockerKey', 'image', 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.image) { errors.color = `Image name can't be blank` }
  if (!values.dockerKey) { errors.color = `Docker key can't be blank` }

  return errors
}

class CreateContainer extends React.Component {
  render() {
    const {
      dispatch,
      errors,
      fields: { dockerKey, image, name },
      params: { containerName }
    } = this.props

    const submit = (event) => {
      event.preventDefault()

      if (Reflect.ownKeys(errors).length > 0) {
        for (var error in errors) {
          dispatch(add('error', Reflect.get(errors, error)))
        }
      } else {
        dispatch(addContainer(containerName, {
          name: name.value,
          dockerKey: dockerKey.value,
          image: image.value
        }))
      }
    }

    return(
      <ContainerForm submit={ submit }
                     name={ name }
                     dockerKey={ dockerKey }
                     image={ image } />
    )
  }
}

const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeForm(CreateContainer)
