import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'
import AppsList from 'components/AppsList'
import Error from 'components/Error'
import styles from './styles.module.css'

const { fetch, destroy } = crud.createCrudActions('apps')

class Apps extends React.Component {
  static fetchData = () => fetch()

  render() {
    const {
      addComponentPage,
      apps,
      editAppPage,
      errorMessage,
      isCached,
      newAppPage,
      refresh,
      removeApp,
      requesting
    } = this.props

    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`
    const loading = requesting ? 1 : 0

    return(
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
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.menu }>
            <button className={ styles.action }
                    onClick={ newAppPage }>
              <span className={ styles.label }>
                Add an app
              </span>
              <i className='fa fa-chevron-circle-right' title="Add an app" />
            </button>
          </div>
          <AppsList apps={ apps }
                    onEdit={ editAppPage }
                    onAddComponent={ addComponentPage }
                    onRemove={ removeApp }/>
          {
            apps.count() === 0 && (
              <div key='welcome' className={ styles.welcome }>
                <div className={ styles.title }>
                  Welcome to Supergiant.
                </div>
                <div className={ styles.intro }>
                  <p>
                    This page is your dashboard.  It's here to be a main
                    control center for visualizing the Supergiant API,
                    and a good tool for using it as well.
                  </p>
                  <p>
                    You're seeing this message now because you haven't
                    made any apps.  We can fix that, though!
                  </p>
                  <button className={ styles.action }
                          disabled={ !isCached }
                          onClick={ newAppPage }>
                    <span className={ styles.label }>
                      Create your first app
                    </span>
                    <i className='fa fa-chevron-circle-right'
                       title="Create your first app" />
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const apps = crud.getRecords(state.get('apps'))
  const requesting = crud.isRequesting(state.get('apps'))
  const errorMessage = crud.getErrorMessage(state.get('apps'))

  return { apps, errorMessage, requesting }
}

function mapDispatchToProps(dispatch, props) {
  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const addComponentPage = id =>
    noSubmit(() => dispatch(push(`/apps/${id}/components/new`)))

  const newAppPage = noSubmit(() => dispatch(push(`/apps/new`)))
  const refresh = noSubmit(() => dispatch(fetch()))
  const editAppPage = id => noSubmit(() => (dispatch(push(`/apps/${id}/edit`))))
  const removeApp = id => noSubmit(() => dispatch(destroy(id)))

  return { addComponentPage, editAppPage, newAppPage, refresh, removeApp }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apps)
