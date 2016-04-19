import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { supergiant } from '../visuals/supergiant'


export default class CreateEntrypoint extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      domain: React.PropTypes.object.isRequired,
    }).isRequired
  }

  componentDidMount() { supergiant.start() }
  componentWillUnmount() { supergiant.stop() }

  render() {
    const { submit, fields: { domain } } = this.props
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create a New Entrypoint</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>

          <div className='entrypoint-create table-row'>
            <div className='col-3'>&nbsp;</div>

            <fieldset className='col-8'>
              <legend>Create a new entrypoint.</legend>

              <div className='table-row'>
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
            </fieldset>
          </div>

        </form>
      </section>

    )
  }
}
