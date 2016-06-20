import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as crud from 'lib/crud-utilities'
import Entrypoints from 'containers/Entrypoints'
import Repos from 'containers/Repos'
import Error from 'components/Error'
import styles from './styles.module.css'

const { fetch } = crud.createCrudActions('settings')

class Settings extends React.Component {
  static fetchData = () => fetch()

  render() {
    const {
      errorMessage,
      newEntrypointPage,
      newRepoPage,
      refresh,
      requesting
    } = this.props

    const opacity = !requesting ? 1.0 : 0.5
    const loading = requesting ? 1 : 0
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`

    return(
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <Error message={ errorMessage } />
          <i className='fa fa-spinner fa-spin fa-2x'
             style={ { opacity: loading } }/>
          <button className={ styles.button }
                  disabled={ requesting }
                  onClick={ refresh }>
            <i className={ iconClass } title="Refresh settings" />
          </button>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <div className={ styles.major }>
            <div className={ styles.header }>
              <div className={ styles.title }>
                <div className='potato'>Entrypoints</div>
              </div>
              <div className={ styles.options }>
                <button disabled={ requesting }
                        onClick={ newEntrypointPage }>
                  <span className={ styles.label }>New entrypoint</span>
                  <i className="fa fa-chevron-circle-right" />
                </button>
              </div>
            </div>
            <Entrypoints />
          </div>
          <div className={ styles.minor }>
            <div className={ styles.header }>
              <div className={ styles.title }>
                Repos
              </div>
              <div className={ styles.options }>
                <button disabled={ requesting }
                        onClick={ newRepoPage }>
                  <span className={ styles.label }>New repo</span>
                  <i className="fa fa-chevron-circle-right" />
                </button>
              </div>
            </div>
            <Repos />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const errorMessage = crud.getErrorMessage(state.get('settings'))
  const requestStates = [state.get('repos'), state.get('entrypoints')]
  const requests = requestStates.map(state => crud.isRequesting(state))
  const requesting = requests.filter(state => state).length !== 0

  return { requesting, errorMessage }
}

function mapDispatchToProps(dispatch, props) {
  const noSubmit = done => event => {
    event.preventDefault()
    done()
  }

  const newEntrypointPage = id =>
    noSubmit(dispatch(push(`/settings/entrypoints/new`)))
  const newRepoPage = id => noSubmit(dispatch(push(`/settings/repos/new`)))
  const refresh = id => noSubmit(dispatch(fetch()))

  return { newEntrypointPage, newRepoPage, refresh }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
