import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { OrbitingSatellite } from '../visuals/orbitingSatellite'

export default class ContainerForm extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    name: React.PropTypes.object.isRequired,
    image: React.PropTypes.object.isRequired,
    dockerKey: React.PropTypes.object.isRequired
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
    const { name, dockerKey, image, submit } = this.props

    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>New Container Image</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit }>
          <div className='image-create-form'>
            <aside className='col-2'>
              <p className='text-note'>
                A <dfn>Docker image</dfn> is the basis of a containerized app.
              </p>
              <p className='text-note'>
                You may use one or more images from a
                private repository with a private docker key.
              </p>
            </aside>

            <fieldset className='component-create-form-fields col-4'>
              <label className="easy">
                Copy in your docker private key
                <textarea { ...dockerKey }
                          style={{ height: '6em' }}
                          autoFocus='true' />
              </label>

              <label className="easy">
                Choose a docker image
                <FeedbackInput type='text'
                               prompt='select an image'
                               value={ image } />
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
