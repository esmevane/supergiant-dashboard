import React from 'react'
import { fromJS } from 'immutable'
import { reduxForm } from 'redux-form'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { get, update } = crud.createCrudActions('edit-image')

class EditImage extends React.Component {
  static fetchData = params => get(params.id)

  render() {
    const { image, requesting, handleSubmit, errorMessage } = this.props
    const { fields: { name } } = this.props

    const opacity = requesting ? 0.5 : 1.0
    const loading = requesting ? 1 : 0

    return(
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <Error message={ errorMessage } />
          <i className='fa fa-spinner fa-spin fa-2x'
             style={ { opacity: loading } }/>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.gap } />
          <div className={ styles.form }>
            <div className={ styles.title }>
              Rename { image && image.name }
            </div>
            <form onSubmit={ handleSubmit }>
              <input placeholder={ image && image.name }
                     className={ styles.input }
                     type='text'
                     { ...name } />
              <button type='submit' className={ styles.button }>
                <span className={ styles.label }>Rename Image</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <Error message={ name.touched && name.error } />
          </aside>
        </div>
      </div>
    )
  }
}

const form = 'images'
const fields = [ 'name' ]
const getFormState = (state, mount) => state.get(mount).toJS()
const initialValues = { name: '' }
const validate = values => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

function mapStateToProps(state, props) {
  const requesting = crud.isRequesting(state.get('edit-image'))
  const errorMessage = crud.getErrorMessage(state.get('edit-image'))
  const image = crud.getRecord(state.get('edit-image'), props.params.id)

  return { image, requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(update(props.params.id, { ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate, initialValues }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(EditImage)
