import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { BackgroundSupergiant } from '../visuals/supergiant'


export default class CreateEntrypoint extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      domain: React.PropTypes.object.isRequired,
    }).isRequired
  }

  componentWillMount()   {
    this.backgroundCanvas = new BackgroundSupergiant()
  }

  componentDidMount()    { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { submit, fields: { domain } } = this.props
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create a New Entrypoint</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>

          <div className='entrypoint-create row'>
            <div className='col-2'>&nbsp;</div>

            <div className='col-10'>
              <div className='row'>
                <div className='col-12'>
                  <h4>Create a new entrypoint.</h4>
                </div>
              </div>

              <div className='row'>
                <div className='col-5'>
                  <FeedbackInput type='text'
                                 prompt='example.com'
                                 className='easy'
                                 autoFocus='true'
                                 value={ domain }/>
                </div>

                <div className='col-3'>
                  <button type='submit' className='easy with-glyph glyph-right-arrow-action-color'>Create</button>
                </div>

                <aside className='col-3'>
                  <p className='text-note'>
                    An entrypoint is a domain name, like <i>example.com</i> that may
                    be reached from the outside world.
                  </p>
                </aside>
              </div>
            </div>
          </div>

        </form>
      </section>

    )
  }
}
