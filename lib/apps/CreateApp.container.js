import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import ButtonLink from '../shared/ButtonLink.container'
import { create } from './apps.actions'

const form = 'apps'
const fields = [ 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = (values) => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

class CreateApp extends React.Component {
  render() {
    const { fields: { name }, dispatch } = this.props
    const opacity = { opacity: this.props.requesting ? 0.5 : 1 }
    const submit = (event) => {
      event.preventDefault()

      dispatch(create({ name: name.value }))
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
            <button type='submit'>Create app</button>
            <ButtonLink to={ `/` }>Cancel</ButtonLink>
          </fieldset>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const requesting = state.getIn(['apps', 'meta', 'requesting'])

  return { requesting }
}

const makeConnection = connect(mapStateToProps)
const makeForm = reduxForm({ form, fields, getFormState, validate })
export default makeConnection(makeForm(CreateApp))
