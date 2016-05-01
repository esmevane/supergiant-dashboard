import React from 'react'
import Component from './Component.container'
import ComponentWelcome from './ComponentWelcome.component'

export default class Components extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    components: React.PropTypes.object.isRequired,
    fetchComponents: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchComponents() }

  render() {
    const { app, components } = this.props

    return(
      <div className='dashboard-list'>
        { (components.count() < 1) && (<ComponentWelcome />) }

        {
          components.map((component, index) => (
            <Component key={ index } component={ component } app={ app } />
          ))
        }
      </div>
    )
  }
}
