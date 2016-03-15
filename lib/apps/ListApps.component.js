import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { open } from '../modals/modals.actions'
import CreateApp from './CreateApp.component'

export class ListApps extends React.Component {
  render() {
    const { apps, onCreate, onNew } = this.props

    return(
      <section className='apps-list'>
        <h2>Your apps</h2>
        <button onClick={ onCreate }>Create an app (Modal)</button>
        <button onClick={ onNew }>New app link</button>
        <ul className='apps-list-content'>
          {
            apps.map(app => (
              <li className='apps-list-item' key={ app.get('id') }>
                <Link to={ `/apps/${app.get('id')}` }>
                  { app.get('name') }
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    )
  }
}

function mapStateToProps(state) {
  let apps = state.getIn(['apps', 'contents'])

  return { apps }
}

function mapDispatchToProps(dispatch) {
  const onCreate = (event) => {
    event.preventDefault()

    dispatch(open(<CreateApp />))
  }

  const onNew = (event) => {
    event.preventDefault()

    dispatch(push('/apps/new'))
  }

  return { onCreate, onNew }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListApps)
