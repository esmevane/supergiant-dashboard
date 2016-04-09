import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { orbitingSatellite } from '../visuals/orbitingSatellite'

export default class VolumeForm extends React.Component {
  componentDidMount() { orbitingSatellite.start() }
  componentWillUnmount() { orbitingSatellite.stop() }

  render() {
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create New Volume</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ e => e.preventDefault() }>
          <div className='image-create-form'>
            <aside className='col-2'>
              <p className='text-note'>
                A volume is disk storage, accessible to containers within a component.
              </p>
            </aside>

            <fieldset className='component-create-form-fields col-4'>
              <label className="easy">
                Create a new volume for qbox-provisioner
                <input type='text'
                       placeholder='name'
                       placeholder='Volume name'
                       className='easy'
                       autoFocus='true' />
              </label>

              <div className='button-group'>
              <label>
                <input type='radio' name='type' value='ssd' checked />
                <span className='button' checked='checked'>SSD</span>
              </label>
                <label>
                  <input type='radio' name='type' value='magnetic' />
                  <span className='button'>Magnetic</span>
                </label>
                <label>
                  <input type='radio' name='type' value='iops' />
                  <span className='button'>IOPS</span>
                </label>
              </div>

              <label className="easy">
                How big is the volume?
                <input type='text'
                       value='50'
                       name='size'
                       placeholder='50'
                       className='easy inline'/>
                &nbsp;GB
              </label>

              <label>
                <button type='submit' className='easy glyph-right-arrow'>
                  Create
                </button>
              </label>
            </fieldset>
          </div>
        </form>
      </section>
    )
  }
}
