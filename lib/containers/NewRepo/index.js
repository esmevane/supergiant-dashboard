import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm, getValues } from 'redux-form'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { create } = crud.createCrudActions('new-repo')

class NewRepo extends React.Component {
  render() {
    const { requesting, handleSubmit, errorMessage } = this.props
    const { fields: { name, email, username, password } } = this.props

    const opacity = requesting ? 0.5 : 1.0
    const loading = requesting ? 1 : 0

    return(
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <i className='fa fa-spinner fa-spin fa-2x'
             style={ { opacity: loading } }/>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.gap } />
          <div className={ styles.form }>
            <form onSubmit={ handleSubmit }>
              <div className={ styles.title }>
                Name your new repository
              </div>
              <input placeholder='The org / user name'
                     className={ styles.input }
                     type='text'
                     { ...name } />
              <div className={ styles.title }>
                Enter your repository credentials
              </div>
              <input placeholder='The account email'
                     className={ styles.input }
                     type='email'
                     { ...email } />
              <input placeholder='The username'
                     className={ styles.input }
                     type='text'
                     { ...username } />
              <input placeholder='A valid password'
                     className={ styles.input }
                     type='password'
                     { ...password } />
              <button type='submit' className={ styles.button }>
                <span className={ styles.label }>Create Repo</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              There's a chance you can put together your apps with completely
              open sourced, public Docker containers.  On the other hand,
              there's a good chance you can't.
            </p>
            <p>
              Supergiant is built to work with Docker hub.  So if you have any
              private containers hosted there, that's what you'll want to create
              a repo for.
            </p>
            <p>
              A Supergiant repo is a set of credentials which allows Supergiant
              to attempt to access private containers on Docker Hub.  Just make
              sure to name the Repo in a way which matches the organization or
              user you want access to, and Supergiant handles the rest.
            </p>
            <Error message={ errorMessage } />
            <Error messages={
              [name, username, email, password]
                .filter(field => field && field.touched && field.error)
                .map(field => field.error)
            } />
          </aside>
        </div>
      </div>
    )
  }
}

const form = 'apps'
const fields = [ 'name', 'username', 'email', 'password' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const initialValues = { name: '', username: '', email: '', password: '' }
const validate = values => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }
  if (!values.username) { errors.username = `Username can't be blank` }
  if (!values.email) { errors.email = `Email can't be blank` }
  if (!values.password) { errors.password = `Password can't be blank` }

  return errors
}

function mapStateToProps(state, props) {
  const requesting = crud.isRequesting(state.get('new-repo'))
  const errorMessage = crud.getErrorMessage(state.get('new-repo'))

  return { requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(create({ ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(NewRepo)
