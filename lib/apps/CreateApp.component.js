import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { appsCreate } from './apps.actions'

const form = 'apps'
const fields = [ 'name', 'region' ]
const getFormState = (state, mount) => state.get(mount).toJS()

class CreateApp extends React.Component {
  render() {
    const { fields: { name, region }, dispatch } = this.props
    const opacity = { opacity: this.props.requesting ? 0.5 : 1 }
    const submit = (event) => {
      event.preventDefault()

      const action = appsCreate({ name: name.value, region: region.value })

      dispatch(action)
    }

    return(
      <div style={ opacity }>
        <form onSubmit={ submit }>
          <fieldset>
            <input type='text' placeholder='Name' { ...name } />
            <input type='text' placeholder="Region" { ...region } />
            <button type='submit'>Log in</button>
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
const makeForm = reduxForm({ form, fields, getFormState })
export default makeConnection(makeForm(CreateApp))
