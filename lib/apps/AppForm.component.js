import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { BackgroundSupergiant } from '../visuals/supergiant'

export default class AppForm extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    name: React.PropTypes.object.isRequired
  }

  componentWillMount()   {
    this.backgroundCanvas = new BackgroundSupergiant()
  }

  componentDidMount()    { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { name, submit } = this.props
    const app_definition       = "An Application is an umbrella that creates " +
                                 "a shared domain space."                      +
                                 "\n\nAn Application is a gerat place to "     +
                                 "hold all the required servies for a website."
    const component_definition = "A Component runs a singular function, such " +
                                  "as a database, search appliance, or CMS. "  +
                                  "\n\nAn Application can be made up of many " +
                                  "Components."
    return(
      <section className='app'>
        <header className='context-header'>
          <div className='context-title'>Create a New App</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit }>
          <div className='app-form row'>
            <div className='col-2' />

            <fieldset className='col-10'>
              <div className='row'>
                <div className='col-12'>
                  <h4>Name your new application.</h4>
                </div>
              </div>

              <div className='row'>
                <div className='col-5'>
                  <FeedbackInput prompt='my-production-app'
                                 type='text'
                                 value={ name }
                                 className='easy'
                                 autoFocus='true' />
                </div>

                <div className='col-3'>
                  <button type='submit' className='easy block with-glyph glyph-right-arrow-action-color'>
                    Create App
                  </button>
                </div>

                <aside className='col-3'>
                  <p className='text-note'>
                    An <dfn title={ app_definition }>Application</dfn> is a domain
                    space for a group of <dfn title={ component_definition }>Components</dfn>.
                    <br />
                    Get started by naming your App.
                  </p>
                </aside>
              </div>
            </fieldset>
          </div>
        </form>
      </section>
    )
  }
}
