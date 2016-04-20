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
    const app_definition       = "An Application is an umbrella that creates " +
                                 "a shared domain space."                      +
                                 "\n\nAn Application is a gerat place to "     +
                                 "hold all the required servies for a website."
    const component_definition = "A Component runs a singular function, such " +
                                  "as a database, search appliance, or CMS. "  +
                                  "\n\nAn Application can be made up of many " +
                                  "Components."

    return(
      <div className='dashboard-list'>
        {
          (components.count() < 1) && (
            <aside className='welcome-component'>
              <p className='text-note'>
                Contratulations, you have a baby <dfn title={ app_definition }>App!</dfn>
              </p>
              <p className='text-note'>
                Apps need <dfn title={ component_definition }>Components</dfn> in
                order to be useful.<br />
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
