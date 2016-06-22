import React from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import kebabCase from 'lodash/kebabCase'
import * as crud from 'lib/crud-utilities'
import App from 'resources/entities/app'
import DynamicResource from 'components/DynamicResource'
import ComponentStatus from 'components/ComponentStatus'
import ComponentAddresses from 'components/ComponentAddresses'
import Error from 'components/Error'
import styles from './styles.module.css'

class ComponentDetail extends React.Component {
  static fetchData = params =>
    crud
      .createCrudActions(`${params.appId}-component-detail`)
      .get(params.id)

  render() {
    const { scope, app, component, onEdit, refresh } = this.props
    const { requesting, handleSubmit, errorMessage } = this.props

    const opacity = requesting || !component ? 0.5 : 1.0
    const loading = requesting || !component ? 1 : 0
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`

    return(
      <DynamicResource scope={ scope } client={ app.components }>
        <div className={ styles.container }>
          <div className={ styles.controls }>
            <Error message={ errorMessage } />
            <i className='fa fa-spinner fa-spin fa-2x'
               style={ { opacity: loading } }/>
            <button className={ styles.button }
                    disabled={ requesting }
                    onClick={ refresh }>
              <i className={ iconClass } title="Refresh apps" />
            </button>
            <button className={ styles.button }
                    onClick={ onEdit }>
              <i className='fa fa-pencil-square fa-2x'
                 title={ `Edit ${component && component.displayName()}`} />
            </button>
          </div>
          <div className={ styles.content } style={ { opacity } }>
            <div className={ styles.title }>
              { component && component.displayName() }
            </div>
            <div className={ styles.status }>
              { component && <ComponentStatus component={ component } /> }
            </div>
            { component && <ComponentAddresses component={ component } /> }
          </div>
        </div>
      </DynamicResource>
    )
  }
}

function mapStateToProps(state, props) {
  const app = new App({ name: props.params.appId })
  const scope = `${props.params.appId}-component-detail`
  const reducer = crud.createCrudReducers(scope)
  const scopedState = state.get(scope) || reducer(fromJS({}), {})
  const component = crud.getRecord(scopedState, props.params.id)
  const requesting = crud.isRequesting(scopedState)
  const errorMessage = crud.getErrorMessage(scopedState)

  return { app, component, scope, requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const scope = `${props.params.appId}-component-detail`
  const { get, update } = crud.createCrudActions(scope)

  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const path = `/apps/${props.params.appId}/components/${props.params.id}`
  const onEdit = noSubmit(() => dispatch(push(`${path}/edit`)))
  const refresh = noSubmit(() => dispatch(get(props.params.id)))

  return { onEdit, refresh }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentDetail)
