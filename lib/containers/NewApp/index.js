import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm, getValues } from 'redux-form'
import kebabCase from 'lodash/kebabCase'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { create } = crud.createCrudActions('new-app')

class NewApp extends React.Component {
  render() {
    const { requesting, handleSubmit, errorMessage } = this.props
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
            <div className={ styles.title }>Name your new application</div>
            <form onSubmit={ handleSubmit }>
              <input placeholder='my-production-app'
                     className={ styles.input }
                     type='text'
                     { ...name } />
              <div className={ styles.preview }>
                {
                  name.value &&
                    <span>
                      Your app ID: <span className={ styles.slug }>
                        { kebabCase(name.value) }
                      </span>
                    </span>
                }
              </div>
              <button type='submit' className={ styles.button }>
                <span className={ styles.label }>Create App</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              Creating an app is super simple.  It's basically just a naming process.  What sort of app are you building?
            </p>
            <ul>
              <li>A SaaS application?</li>
              <li>A blog?</li>
              <li>A bitcoin miner?</li>
              <li>A personal sandbox?</li>
            </ul>
            <p>
              We'll take your name and generate an API key (slug) for it, and then you can start defining your app components.
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
  const requesting = crud.isRequesting(state.get('new-app'))
  const errorMessage = crud.getErrorMessage(state.get('new-app'))

  return { requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(create({ ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(NewApp)
