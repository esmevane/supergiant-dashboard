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
        <form onSubmit={ submit }>
          <div className='app-form'>
            <div className='app-form-title'>
              Name your new application.
            </div>
            <div className='app-form-input'>
              <FeedbackInput prompt='My production app'
                             type='text'
                             value={ name } />
            </div>
            <div className='app-form-confirm'>
              <button type='submit'>
                Discover
                <span className='carat'>»</span>
              </button>
            </div>
          </div>
        </form>
        <aside>
          An <dfn>application</dfn> is a group of components, each with their own set of containers (or images).
        </aside>
      </section>
    )
  }
}
