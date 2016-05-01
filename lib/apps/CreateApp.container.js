import React from 'react'
import { reduxForm, getValues } from 'redux-form'
import { create } from './apps.actions'
import { add } from '../notifications/notifications.actions'
import CreateApp from './CreateApp.component'

const form = 'apps'
const fields = [ 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

function mapStateToProps(state, props) { return {} }

function mapDispatchToProps(dispatch, props) {
  const submit = props => event => {
    const { values, errors } = props

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

const manifest = { form, fields, getFormState, validate }
const makeForm = reduxForm(manifest, mapStateToProps, mapDispatchToProps)

export default makeForm(CreateApp)
