import React from 'react'
import SelectMinMax from '../shared/SelectMinMax.component'
import FeedbackInput from '../shared/FeedbackInput.component'
import ManageEnv from './ManageEnv.component'
import ManageMounts from './ManageMounts.component'
import ManagePorts from './ManagePorts.component'
import { CityOnPlanet } from '../visuals/CityOnPlanet'

export default class ContainerForm extends React.Component {
  static propTypes = {
    component: React.PropTypes.object.isRequired,
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      image: React.PropTypes.object.isRequired,
      cpu: React.PropTypes.object.isRequired,
      ram: React.PropTypes.object.isRequired,
      mounts: React.PropTypes.array.isRequired,
      ports: React.PropTypes.array.isRequired,
      env: React.PropTypes.array.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state = { color: '#ff0000' }

    props.component && this.setState({ color: props.component.get('color') })

    this.backgroundCanvas = new CityOnPlanet(this.state.color)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component) {
      this.setState({ color: nextProps.component.get('color') })

      let newSatellite = new CityOnPlanet(this.state.color)

      this.backgroundCanvas.stop()
      this.backgroundCanvas = newSatellite
      this.backgroundCanvas.start()
    }
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { image, cpu, ram, mounts, ports, env } = this.props.fields
    const { submit } = this.props

    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create a New Container</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>
          <div className='container-create-form'>


            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <fieldset className='col-4'>
                <label className='easy'>Docker Image</label>
                <FeedbackInput autoFocus='true' type='text' prompt='select an image' value={ image } />
              </fieldset>
            </div>

            <br /><br />

            <div className='table-row'>
              <aside className='col-2'>
                <p className='text-note'>
                  Select the resources you want this Container to use
                  during high and low load times.
                </p>
                <p className='text-note'>
                  Supergiant will automatically scale within this range, and
                  the Packing Algorithm will automatically maxise use of
                  available hardware.
                </p>
              </aside>

              <fieldset className='col-4'>
                <label className='easy'>CPU</label>
                <SelectMinMax { ...cpu } />

                <label className='easy'>RAM</label>
                <SelectMinMax { ...ram } />
              </fieldset>
            </div>

            <br /><br />

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>
              <ManageEnv env={ env } />
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>
              <ManageMounts mounts={ mounts } />
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>
              <ManagePorts ports={ ports } />
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <div className='col-4'>
                <button className='with-glyph glyph-right-arrow' type='submit'>
                  Create container
                </button>
              </div>
            </div>
          </div>

        </form>
      </section>
    )
  }
}
