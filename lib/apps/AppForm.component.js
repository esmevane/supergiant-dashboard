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
                <FeedbackInput prompt='My production app'
                               type='text'
                               value={ name }
                               className='easy'
                               autoFocus='true' />
              </div>

              <div className='col-3'>
                <button type='submit' className='easy block with-glyph glyph-right-arrow'>
                  Create App
                </button>
              </div>

              <aside className='col-3'>
                <p className='text-note'>
                  An <dfn>application</dfn> is a group of components, each with
                  their own set of containers (or images).
                </p>
              </aside>
            </fieldset>

          </div>
        </form>
      </section>
    )
  }
}
