import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { create } from './components.actions'

const form = 'components'
const fields = [ 'name', 'type' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.type) { errors.type = `Type can't be blank` }

  return errors
}

class CreateApp extends React.Component {
  render() {
    const { fields: { name, type }, appId, dispatch } = this.props
    const opacity = { opacity: this.props.requesting ? 0.5 : 1 }
    const submit = (event) => {
      event.preventDefault()

      dispatch(create({ name: name.value, type: type.value, appId }))
    }

    return(
      <div style={ opacity }>
        <form onSubmit={ submit }>
          <fieldset>
            <input type='text' placeholder='Name' { ...name } />
            {
              name.touched && name.error && (
                <div className='form-error'>{ name.error }</div>
              )
            }
            <input type='text' placeholder='Type' { ...type } />
            {
              type.touched && type.error && (
                <div className='form-error'>{ type.error }</div>
              )
            }
            <button type='submit'>Log in</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const requesting = state.getIn(['components', 'meta', 'requesting'])

  return { requesting }
}

const makeConnection = connect(mapStateToProps)
const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeConnection(makeForm(CreateApp))
