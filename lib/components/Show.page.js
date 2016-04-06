import React from 'react'
import ShowComponent from './ShowComponent.component'
import NotFound from '../shared/NotFound.page'

export default class Show extends React.Component {
  render() {
    const { app, component } = this.props

    if (app && component) {
      return <ShowComponent { ...(this.props) } />
    } else {
      return <NotFound />
    }
  }
}
