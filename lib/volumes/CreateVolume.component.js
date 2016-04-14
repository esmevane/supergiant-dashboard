import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { OrbitingSatellite } from '../visuals/orbitingSatellite'

export default class CreateVolume extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      size: React.PropTypes.object.isRequired,
      type: React.PropTypes.object.isRequired
    }).isRequired
  }
  constructor(props) {
    super(props)
    // this.planetColor = props.component.get('color')
    this.planetColor = '#ff0000'
    this.backgroundCanvas = new OrbitingSatellite(this.planetColor)
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { submit, fields: { name, size, type } } = this.props
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create New Volume</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>
          <div className='image-create-form'>
            <aside className='col-2'>
              <p className='text-note'>
                A volume is disk storage, accessible to containers within a component.
              </p>
            </aside>

            <fieldset className='component-create-form-fields col-4'>
              <label className="easy">
                Create a new volume for qbox-provisioner
                <FeedbackInput type='text'
                               className='easy'
                               prompt='Volume name'
                               value={ name }
                               autoFocus='true' />
              </label>

              <div className='button-group'>
              <label>
                <input type='radio'
                       value='ssd'
                       { ...type }
                       checked={ type.value === 'ssd' }
                       defaultChecked='true' />
                <span className='button'>SSD</span>
              </label>
                <label>
                  <input type='radio'
                         checked={ type.value === 'magnetic' }
                         { ...type }
                         value='magnetic' />
                  <span className='button'>Magnetic</span>
                </label>
                <label>
                  <input type='radio'
                         checked={ type.value === 'iops' }
                         { ...type }
                         value='iops' />
                  <span className='button'>IOPS</span>
                </label>
              </div>

              <label className="easy">
                How big is the volume?
                <input type='text'
                       { ...size }
                       placeholder='50'
                       className='easy inline' />
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
