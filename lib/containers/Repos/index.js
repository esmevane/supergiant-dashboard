import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'
import ReposList from 'components/ReposList'
import styles from './styles.module.css'

const { fetch, destroy } = crud.createCrudActions('repos')

class Repos extends React.Component {
  static fetchData = () => fetch()

  render() {
    const {
      repos,
      editRepoPage,
      errorMessage,
      isCached,
      newRepoPage,
      refresh,
      removeRepo,
      requesting
    } = this.props

    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`
    const loading = requesting ? 1 : 0

    return(
      <span>
        {
          repos.count() !== 0 &&
            <ReposList key='repos'
                       onRemove={ removeRepo }
                       onEdit={ editRepoPage }
                       repos={ repos } />
        }
        {
          repos.count() === 0 && (
            <div key='welcome' className={ styles.welcome }>
              <div className={ styles.intro }>
                <p>
                  If you're only building apps with public images, then you
                  definitely don't need to set up any Repos.
                </p>
                <p>
                  On the other hand, if there's anything private or propriatary which you need, then you'll have to give Supergiant your credentials.  It'll figure out your key with those, and you should be good to go.
                </p>
                <button className={ styles.action }
                        disabled={ requesting }
                        onClick={ newRepoPage  }>
                  <span className={ styles.label }>
                    Enter some credentials
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
  const repos = crud.getRecords(state.get('repos'))
  const requesting = crud.isRequesting(state.get('repos'))
  const errorMessage = crud.getErrorMessage(state.get('repos'))

  return { repos, errorMessage, requesting }
}

function mapDispatchToProps(dispatch, props) {
  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const newRepoPage = noSubmit(() => dispatch(push(`/settings/repos/new`)))
  const refresh = noSubmit(() => dispatch(fetch()))
  const editRepoPage = id =>
    noSubmit(() => (dispatch(push(`/settings/repos/${id}/edit`))))

  const removeRepo = id => noSubmit(() => dispatch(destroy(id)))

  return { editRepoPage, newRepoPage, refresh, removeRepo }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repos)
