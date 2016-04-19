import React from 'react'
import Component from './Component.container'

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
        {
          (components.count() < 1) && (
            <aside className='welcome-component'>
              <p className='text-note'>
                Contratulations, you have a little baby <dfn>App!</dfn>
              </p>
              <p className='text-note'>
                Apps need <dfn>Components</dfn> in order to be useful.<br />
                Continue to build your App by adding a Component.
              </p>
            </aside>
          )
        }

        {
          components.map((component, index) => (
            <Component key={ index } component={ component } app={ app } />
          ))
        }
      </div>
    )
  }
}
