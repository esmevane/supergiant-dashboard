import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm, getValues } from 'redux-form'
import kebabCase from 'lodash/kebabCase'
import * as crud from 'lib/crud-utilities'
import App from 'resources/entities/app'
import DynamicResource from 'components/DynamicResource'
import Error from 'components/Error'
import styles from './styles.module.css'

const colors = [
  `lightcoral`,
  `sandybrown`,
  `tan`,
  `mediumorchid`,
  `cornflowerblue`,
  `darkseagreen`,
]

const appActions = crud.createCrudActions('apps')

class NewComponent extends React.Component {
  static fetchData = params => appActions.get(params.id)

  render() {
    const { scope, app } = this.props
    const { requesting, handleSubmit, errorMessage } = this.props
    const { fields: { name, color } } = this.props

    const opacity = requesting || !app ? 0.5 : 1.0
    const loading = requesting || !app ? 1 : 0

    const staticContent =
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <i className='fa fa-spinner fa-spin fa-2x'
             style={ { opacity: loading } }/>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.gap } />
          <div className={ styles.form }>
            <div className={ styles.title }>
              Name your new component
            </div>
            <form onSubmit={ handleSubmit }>
              <input placeholder='database'
                     className={ styles.input }
                     type='text'
                     { ...name }
                     disabled={ loading } />
              <div className={ styles.preview }>
                {
                  name.value &&
                    <span>
                      Your component ID: <span className={ styles.slug }>
                        { kebabCase(name.value) }
                      </span>
                    </span>
                }
              </div>
              <div className={ styles.title }>
                Pick a color for the component
              </div>
              <div className={ styles.colors }>

                {
                  colors.map((backgroundColor, index) => (
                    <label key={ index }>
                      <input type='radio'
                             { ...color }
                             disabled={ loading }
                             className={ styles.colorRadio }
                             value={ backgroundColor }
                             checked={ color.value === backgroundColor } />
                      <div key={ index }
                           className={ styles.color }
                           style={ { backgroundColor } } />
                    </label>
                  ))
                }
              </div>
              <button type='submit'
                      disabled={ loading }
                      className={ styles.button }>
                <span className={ styles.label }>Create Component</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              Just like creating apps, creating components isn't at all
              complicated.  Every component describes a part of the system
              which makes up your app.  Components can be:
            </p>
            <ul>
              <li>Databases</li>
              <li>Message queues</li>
              <li>Web servers</li>
              <li>Etc.</li>
            </ul>
            <p>
              Again, like apps, we use the name you give your component and
              we make a slug out of it.  So you can tell your components apart
              at a glance, you can also pick a color for your it.
            </p>
            <Error message={ errorMessage } />
            <Error message={ name.touched && name.error } />
          </aside>
        </div>
      </div>

    const asyncContent = () =>
      <DynamicResource scope={ scope } client={ app.components }>
        { staticContent }
      </DynamicResource>

    return loading ? staticContent : asyncContent()
  }
}

const form = 'components'
const fields = [ 'name', 'color' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const initialValues = { name: '', color: 'lightcoral' }
const validate = values => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

function mapStateToProps(state, props) {
  const app = crud.getRecord(state.get('apps'), props.params.id)

  if (!app) { return {} }

  const scope = `${app.key()}-new-component`
  const reducer = crud.createCrudReducers(scope)
  const scopedState = state.get(scope) || reducer(fromJS({}), {})
  const requesting = crud.isRequesting(scopedState)
  const errorMessage = crud.getErrorMessage(scopedState)

  return { app, scope, requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const scope = `${props.params.id}-new-component`
  const { create } = crud.createCrudActions(scope)
  const onSubmit = values => dispatch(create({ ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(NewComponent)
