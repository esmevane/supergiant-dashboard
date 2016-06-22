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

class EditComponent extends React.Component {
  componentDidMount() { this.props.fetchData() }

  componentDidUpdate(previous) {
    const hasChanged = previous.component !== this.props.component

    if (hasChanged) {
      this.props.fields.color.onChange(this.props.component.displayColor())
    }
  }

  render() {
    const { scope, app, component } = this.props
    const { requesting, handleSubmit, errorMessage } = this.props
    const { fields: { name, color } } = this.props

    const opacity = requesting || !component ? 0.5 : 1.0
    const loading = requesting || !component ? 1 : 0

    return(
      <DynamicResource scope={ scope } client={ app.components }>
        <div className={ styles.container }>
          <div className={ styles.controls }>
            <i className='fa fa-spinner fa-spin fa-2x'
               style={ { opacity: loading } }/>
          </div>
          <div className={ styles.content } style={ { opacity } }>
            <div className={ styles.gap } />
            <div className={ styles.form }>
              <div className={ styles.title }>
                Rename your component
              </div>
              <form onSubmit={ handleSubmit }>
                <input placeholder={ component && component.displayName() }
                       className={ styles.input }
                       type='text'
                       { ...name }
                       disabled={ loading } />
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
                               checked={ backgroundColor === color.value } />

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
                  <span className={ styles.label }>Update Component</span>
                  <i className="fa fa-chevron-circle-right" />
                </button>
              </form>
            </div>
            <aside className={ styles.overview }>
              <p>
                Here you can change the name or color of your components.
                Usually this'll just be to help tell them apart at a glance,
                though.
              </p>
              <p>
                Just like when editing app names, changing a component name
                will not change that component's slug or uri.
              </p>
              <Error message={ errorMessage } />
              <Error message={ name.touched && name.error } />
            </aside>
          </div>
        </div>
      </DynamicResource>
    )
  }
}

const form = 'components'
const fields = [ 'name', 'color' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const initialValues = { name: undefined, color: 'lightcoral' }
const validate = values => ({})

function mapStateToProps(state, props) {
  const app = new App({ name: props.params.appId })
  const scope = `${props.params.appId}-edit-component`
  const reducer = crud.createCrudReducers(scope)
  const scopedState = state.get(scope) || reducer(fromJS({}), {})
  const component = crud.getRecord(scopedState, props.params.id)
  const requesting = crud.isRequesting(scopedState)
  const errorMessage = crud.getErrorMessage(scopedState)

  return { app, component, scope, requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const scope = `${props.params.appId}-edit-component`
  const { get, update } = crud.createCrudActions(scope)
  const fetchData = () => dispatch(get(props.params.id))
  const onSubmit = values => {
    const params = fromJS(values).filter(value => value).toJS()

    dispatch(update(props.params.id, { ...params }))
  }

  return { onSubmit, fetchData }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(EditComponent)
