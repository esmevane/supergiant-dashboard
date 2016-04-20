import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { supergiant } from '../visuals/supergiant'

export default class AppForm extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    name: React.PropTypes.object.isRequired
  }

  componentDidMount() { supergiant.start() }
  componentWillUnmount() { supergiant.stop() }

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
        <div className='starship' />

        <header className='context-header'>
          <div className='context-title'>Create a New App</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit }>
          <div className='app-form'>
            <div className='app-form-pad' />

            <fieldset className='app-form-fields'>
              <legend>Name your new application.</legend>

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
            </fieldset>

          </div>
        </form>
      </section>
    )
  }
}
