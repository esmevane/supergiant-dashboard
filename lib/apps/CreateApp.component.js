import React from 'react'
import AppForm from './AppForm.component'
import { BackgroundSupergiant } from '../visuals/supergiant'

export default class CreateApp extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired
    }).isRequired
  }

  componentWillMount() { this.backgroundCanvas = new BackgroundSupergiant() }
  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { fields: { name }, submit } = this.props
    return <AppForm name={ name } submit={ submit(this.props) } />
  }
}
