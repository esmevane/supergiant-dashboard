import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getApp } from './apps.behavior'
import NotFound from '../shared/NotFound.page'

class ShowApp extends React.Component {
  render() {
    const { params: { id }, contents } = this.props
    const app = getApp(id, contents)

    if (app) {
      return(
        <article className='apps-detail'>
          <header>
            <h3>{app.get('name')}</h3>
            <h4>{app.get('id')}</h4>
          </header>
          <section className='apps-detail-main' />
          <footer>
            <Link to='apps'>Back to Apps</Link>
          </footer>
        </article>
      )
    } else {
      return <NotFound />
    }
  }
}

function mapStateToProps(state) {
  let contents = state.getIn(['apps', 'contents'])

  return { contents }
}

export default connect(mapStateToProps)(ShowApp)
