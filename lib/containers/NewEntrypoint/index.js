import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm, getValues } from 'redux-form'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { create } = crud.createCrudActions('new-entrypoint')

class NewEntrypoint extends React.Component {
  render() {
    const { requesting, handleSubmit, errorMessage } = this.props
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
            <div className={ styles.title }>Name your new entrypoint</div>
            <form onSubmit={ handleSubmit }>
              <input placeholder='example.com'
                     className={ styles.input }
                     type='text'
                     { ...domain } />
              <button type='submit' className={ styles.button }>
                <span className={ styles.label }>Create Entrypoint</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              In order to give your Supergiant apps a route to the outside
              world, you'll use entrypoints.  Just declare a domain name which
              you want Supergiant to use, hit enter and wait.
            </p>
            <p>
              (It does take a few minutes.)
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
  const requesting = crud.isRequesting(state.get('new-entrypoint'))
  const errorMessage = crud.getErrorMessage(state.get('new-entrypoint'))

  return { requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(create({ ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(NewEntrypoint)
