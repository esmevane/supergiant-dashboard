import React from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'
import DynamicResource from 'components/DynamicResource'
import ComponentsList from 'components/ComponentsList'
import Error from 'components/Error'
import styles from './styles.module.css'

class Components extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    client: React.PropTypes.object.isRequired,
    scope: React.PropTypes.string.isRequired
  }

  componentDidMount() { this.props.fetchData() }

  render() {
    const {
      app,
      components,
      client,
      editComponentPage,
      errorMessage,
      newComponentPage,
      refresh,
      removeComponent,
      requesting,
      scope,
    } = this.props

    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`
    const loading = requesting ? 1 : 0

    return(
      <DynamicResource scope={ scope } client={ client }>
        <div className={ styles.container }>
          <div className={ styles.content } style={ { opacity } }>
            <ComponentsList components={ components }
                            onEdit={ editComponentPage }
                            onRemove={ removeComponent }/>
            {
              components.count() === 0 && (
                <div key='welcome' className={ styles.welcome }>
                  <div className={ styles.intro }>
                    <p>
                      This is where your app components will show up.  Every
                      component represents a single internal app resource:
                      things like databases, web hosts, job queues, etc.
                    </p>
                    <button className={ styles.action }
                            disabled={ requesting }
                            onClick={ newComponentPage }>
                      <span className={ styles.label }>
                        Create your first component
                      </span>
                      <i className='fa fa-chevron-circle-right'
                         title="Create your first component" />
                    </button>
                  </div>
                </div>
              )
            }
          </div>
          <div className={ styles.controls }>
            <Error message={ errorMessage } />
            <i className='fa fa-spinner fa-spin fa-2x'
               style={ { opacity: loading } }/>
            <button className={ styles.button }
                    disabled={ requesting }
                    onClick={ refresh }>
              <i className={ iconClass } title="Refresh components" />
            </button>
          </div>
        </div>
      </DynamicResource>
    )
  }
}

function mapStateToProps(state, props) {
  const { app, scope } = props
  const reducer = crud.createCrudReducers(scope)
  const scopedState = state.get(scope) || reducer(fromJS({}), {})
  const components = crud.getRecords(scopedState)
  const requesting = crud.isRequesting(scopedState)
  const errorMessage = crud.getErrorMessage(scopedState)

  return { app, components, errorMessage, requesting }
}

function mapDispatchToProps(dispatch, props) {
  const { app, scope } = props
  const actions = crud.createCrudActions(scope)
  const rootPath = `/apps/${app.key()}/components`
  const { fetch, destroy } = actions

  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const editComponentPage = id =>
    noSubmit(() => dispatch(push(`${rootPath}/${id}/edit`)))

  const newComponentPage = noSubmit(() => dispatch(push(`${rootPath}/new`)))
  const fetchData = () => dispatch(fetch())
  const refresh = noSubmit(fetchData)
  const removeComponent = id => noSubmit(() => dispatch(destroy(id)))

  return {
    editComponentPage,
    fetchData,
    newComponentPage,
    refresh,
    removeComponent,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Components)
