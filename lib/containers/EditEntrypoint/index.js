import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm, getValues } from 'redux-form'
import kebabCase from 'lodash/kebabCase'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { get, update } = crud.createCrudActions('edit-entrypoint')

class EditEntrypoint extends React.Component {
  static fetchData = params => get(params.id)

  render() {
    const { entrypoint, requesting, handleSubmit, errorMessage } = this.props
    const { fields: { domain } } = this.props

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
              Edit { entrypoint && entrypoint.displayName() }
            </div>
            <form onSubmit={ handleSubmit }>
              <input placeholder={ entrypoint && entrypoint.displayName() }
                     className={ styles.input }
                     type='text'
                     { ...domain } />
              <button type='submit' className={ styles.button }>
                <span className={ styles.label }>Rename Entrypoint</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              Renaming entrypoints is as straightforward a process as renaming
              your apps, and under the hood it's a safe thing to do.  In the
              end you'll probably want to just create a new entrypoint if you
              want a different external address.
            </p>
            <Error message={ errorMessage } />
            <Error message={ domain.touched && domain.error } />
          </aside>
        </div>
      </div>
    )
  }
}

const form = 'apps'
const fields = [ 'domain' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const initialValues = { domain: '' }
const validate = values => {
  let errors = {}

  if (!values.domain) { errors.domain = `Domain can't be blank` }

  return errors
}

function mapStateToProps(state, props) {
  const requesting = crud.isRequesting(state.get('edit-entrypoint'))
  const errorMessage = crud.getErrorMessage(state.get('edit-entrypoint'))
  const entrypoint = crud.getRecord(
    state.get('edit-entrypoint'),
    props.params.id
  )

  return { entrypoint, requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(update(props.params.id, { ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(EditEntrypoint)
