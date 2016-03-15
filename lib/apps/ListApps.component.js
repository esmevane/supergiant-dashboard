import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { openModal } from '../modals/modals.actions'
import CreateApp from './CreateApp.component'

export class ListApps extends React.Component {
  render() {
    const createApp = (event) => {
      event.preventDefault()

      this.props.dispatch(openModal(<CreateApp />))
    }

    const newApp = (event) => {
      event.preventDefault()

      this.props.dispatch(push('/apps/new'))
    }

    return(
      <section className='apps'>
        <h2>Your apps</h2>
        <button onClick={ createApp }>Create an app (Modal)</button>
        <button onClick={ newApp }>New app link</button>
        <ul>
          {
            this.props.contents.map(app => (
              <li key={ app.get('id') }>
                <Link to={ `/apps/${app.get('id')}` }>
                  { app.get('name') } in { app.get('region') }
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
  let contents = state.getIn(['apps', 'contents'])

  return { contents }
}

export default connect(mapStateToProps)(ListApps)
