import React from 'react'
import { connect } from 'react-redux'
import { getApp, createOrderedComponentsSelector } from '../selectors'
import AppDetail from './AppDetail.component'
import NotFound from '../shared/NotFound.page'

class Show extends React.Component {
  render() {
    const { app, components } = this.props
    if (app) {
      return <AppDetail { ...({ app, components }) } />
    } else {
      return <NotFound />
    }
  }
}

function mapStateToProps(state, props) {
  const getComponents = createOrderedComponentsSelector()
  const { params: { id } } = props
  const app = getApp(state, props)
  const components = getComponents(state, props)

  return { app, components }
}

export default connect(mapStateToProps)(Show)
