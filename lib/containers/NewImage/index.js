import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { fromJS } from 'immutable'
import { reduxForm } from 'redux-form'
import * as crud from 'lib/crud-utilities'
import Error from 'components/Error'
import styles from './styles.module.css'

const { create } = crud.createCrudActions(`images`)

class NewImage extends React.Component {
  render() {
    const { requesting, handleSubmit, errorMessage } = this.props
    const { fields: { command, env, mounts, name, ports } } = this.props

    const opacity = requesting ? 0.5 : 1.0
    const loading = requesting ? 1 : 0

    return(
      <div className={ styles.container }>
        <Error message={ errorMessage } />
        <div className={ styles.controls }>
          <i className='fa fa-spinner fa-spin fa-2x'
             style={ { opacity: loading } }/>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.gap } />
          <div className={ styles.form }>
            <form onSubmit={ handleSubmit }>
              <div className={ styles.title }>
                Name your new image
              </div>
              <input placeholder='user-or-org/image:tag'
                     className={ styles.input }
                     type='text'
                     { ...name }
                     disabled={ loading } />
              <button type='submit'
                      disabled={ loading }
                      className={ styles.button }>
                <span className={ styles.label }>Create Image</span>
                <i className="fa fa-chevron-circle-right" />
              </button>
            </form>
          </div>
          <aside className={ styles.overview }>
            <p>
              Image workflows and pages relating to them represent a crucial
              part of the overall Supergiant toolkit.
            </p>
            <p>
              An image is a full description of how to build containers in the
              deploy process.  You use an image to specify exactly what you want
              Supergiant to do with your deployments.
            </p>
            <p>
              Soon you'll be able to add volume mounts, configure environment
              variables, and expose ports on any of your images, but for now
              let's just start with an image name.
            </p>
            <Error message={ name.touched && name.error } />
          </aside>
        </div>
      </div>
    )
  }
}

const fields = [ `name` ]
const form = `images`
const getFormState = (state, mount) => state.get(mount).toJS()
const validate = values => {
  let errors = {}

  if (!values.name) { errors.name = `Name can't be blank` }

  return errors
}

function mapStateToProps(state, props) {
  const reducer = crud.createCrudReducers(`new-image`)
  const scopedState = state.get(`new-image`) || reducer(fromJS({}), {})
  const requesting = crud.isRequesting(scopedState)
  const errorMessage = crud.getErrorMessage(scopedState)

  return { requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const onSubmit = values => dispatch(create({ ...values }))

  return { onSubmit }
}

const config = { form, fields, getFormState, validate }
const makeForm = reduxForm(config, mapStateToProps, mapDispatchToProps)

export default makeForm(NewImage)
