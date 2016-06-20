import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'
import EntrypointsList from 'components/EntrypointsList'
import Error from 'components/Error'
import styles from './styles.module.css'

const { fetch, destroy } = crud.createCrudActions('entrypoints')

class Entrypoints extends React.Component {
  static fetchData = () => fetch()

  render() {
    const {
      entrypoints,
      editEntrypointPage,
      errorMessage,
      newEntrypointPage,
      refresh,
      removeEntrypoint,
      requesting
    } = this.props

    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`
    const loading = requesting ? 1 : 0

    return(
      <span>
        {
          entrypoints.count() !== 0 &&
            <EntrypointsList onRemove={ removeEntrypoint }
                             onEdit={ editEntrypointPage }
                             key='entrypoints'
                             entrypoints={ entrypoints } />
        }
        {
          entrypoints.count() === 0 && (
            <div key='welcome' className={ styles.welcome }>
              <div className={ styles.intro }>
                <p>
                  In order to get access to the outside world, Supergiant
                  needs to be told how and where.  That's an Entrypoint.  You don't have any yet, but they're super simple to
                  get started on.
                </p>
                <button className={ styles.action }
                        disabled={ requesting }
                        onClick={ newEntrypointPage  }>
                  <span className={ styles.label }>
                    Establish an entrypoint
                  </span>
                  <i className='fa fa-chevron-circle-right'
                     title="Create your first app" />
                </button>
              </div>
            </div>

          )
        }
      </span>
    )
  }
}

function mapStateToProps(state, props) {
  const entrypoints = crud.getRecords(state.get('entrypoints'))
  const requesting = crud.isRequesting(state.get('entrypoints'))
  const errorMessage = crud.getErrorMessage(state.get('entrypoints'))

  return { entrypoints, errorMessage, requesting }
}

function mapDispatchToProps(dispatch, props) {
  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const newEntrypointPage = noSubmit(() => (
    dispatch(push(`/settings/entrypoints/new`))
  ))

  const refresh = noSubmit(() => dispatch(fetch()))
  const editEntrypointPage = id =>
    noSubmit(() => (dispatch(push(`/settings/entrypoints/${id}/edit`))))

  const removeEntrypoint = id => noSubmit(() => dispatch(destroy(id)))

  return { editEntrypointPage, newEntrypointPage, refresh, removeEntrypoint }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entrypoints)
