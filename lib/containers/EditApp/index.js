import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm, getValues } from 'redux-form'
import kebabCase from 'lodash/kebabCase'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { get, update } = crud.createCrudActions('edit-app')

class EditApp extends React.Component {
  static fetchData = params => get(params.id)

  render() {
    const { app, requesting, handleSubmit, errorMessage } = this.props
    const { fields: { name } } = this.props

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
            <div className={ styles.title }>
              Rename { app && app.displayName() }
            </div>
            <form onSubmit={ handleSubmit }>
              <input placeholder={ app && app.displayName() }
                     className={ styles.input }
                     type='text'
                     { ...name } />
              <div className={ styles.preview }>
                <p>
                  Your app ID: <span className={ styles.slug }>
                    { app && kebabCase(app.key()) }
                  </span>
                </p>
              </div>
              <button type='submit' className={ styles.button }>
                <span className={ styles.label }>Rename App</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              Sometimes you need to rename your apps for sanity's sake, but don't worry - everything under the hood will continue to work just fine.
            </p>
            <p>
              At app creation, your app is given a slug ID and any updates to it leave this ID alone, meaning you can rename your app whatever you like and everything will continue to operate as expected.
            </p>
            <Error message={ errorMessage } />
            <Error message={ name.touched && name.error } />
          </aside>
        </div>
      </div>
    )
  }
}

const form = 'apps'
const fields = [ 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const initialValues = { name: '' }
const validate = values => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

function mapStateToProps(state, props) {
  const requesting = crud.isRequesting(state.get('edit-app'))
  const errorMessage = crud.getErrorMessage(state.get('edit-app'))
  const app = crud.getRecord(state.get('edit-app'), props.params.id)

  return { app, requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(update(props.params.id, { ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(EditApp)
