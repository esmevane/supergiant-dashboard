import React from 'react'
import { reduxForm } from 'redux-form'
import { add } from '../notifications/notifications.actions'
import { create } from '../registries/registries.actions'
import CreateRegistry from './CreateRegistry.component'

const generateKey = props => {
  const { values } = props
  const { username, password } = values

  return new Buffer(`${username}:${password}`).toString(`base64`)
}

const form = 'registries'
const fields = [ 'name', 'username', 'password' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}
  let emptyKey = generateKey({ values: { username: '', password: '' } })

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.username) { errors.username = `Username can't be blank` }
  if (!values.password) { errors.password = `Password can't be blank` }

  return errors
}

function mapStateToProps() { return {} }

function mapDispatchToProps(dispatch, props) {
  const submit = props => event => {
    const { errors, values } = props
    const { username, password, ...rest } = values
    const key = generateKey({ values })

    event.preventDefault()

    if (Reflect.ownKeys(errors).length > 0) {
      for (var error in errors) {
        dispatch(add('error', Reflect.get(errors, error)))
      }
    } else {
      dispatch(create({ ...rest, key }))
    }
  }

  return { submit }
}

const formConfig = { form, fields, getFormState, validate }
const connector = reduxForm(formConfig, mapStateToProps, mapDispatchToProps)

export default connector(CreateRegistry)
