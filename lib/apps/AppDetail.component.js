import React from 'react'
import AppView from './AppView.component'
import { BackgroundSupergiant } from '../visuals/supergiant'

export default class AppDetail extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    deleteApp: React.PropTypes.func.isRequired,
    invalidateCache: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.invalidateCache()
    this.backgroundCanvas = new BackgroundSupergiant()
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { deleteApp, app } = this.props
    const opacity = app ? 1 : 0.5

    return <AppView opacity={ opacity } { ...(this.props) } />
  }
}
