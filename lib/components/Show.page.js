import React from 'react'
import { connect } from 'react-redux'
import { get } from '../shared/entities.behavior'
import ComponentDetail from './ComponentDetail.component'
import NotFound from '../shared/NotFound.page'

class Show extends React.Component {
  render() {
    const { params: { appId, id }, apps, components } = this.props
    const filter = component => component && component.get('appId') === appId
    const component = get(id, components.filter(filter))
    const app = get(appId, apps)

    if (app && component) {
      return <ComponentDetail app={ app } component={ component } />
    } else {
      return <NotFound />
    }
  }
}

function mapStateToProps(state) {
  let components = state.getIn(['components', 'contents'])
  let apps = state.getIn(['apps', 'contents'])

  return { apps, components }
}

export default connect(mapStateToProps)(Show)
