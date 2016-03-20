import React from 'react'
import { connect } from 'react-redux'
import { get } from '../shared/entities.behavior'
import { getApps, getComponents } from '../selectors'
import ComponentDetail from './ComponentDetail.component'
import NotFound from '../shared/NotFound.page'

class Show extends React.Component {
  render() {
    const { app, component } = this.props

    if (app && component) {
      return <ComponentDetail app={ app } component={ component } />
    } else {
      return <NotFound />
    }
  }
}

function mapStateToProps(state, props) {
  const { params: { appId, id } } = props
  const app = getApps(state).get(appId)
  const component = getComponents(state).get(id)

  return { app, component }
}

export default connect(mapStateToProps)(Show)
