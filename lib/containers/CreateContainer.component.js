import React from 'react'
import SelectMinMax from '../shared/SelectMinMax.component'
import FeedbackInput from '../shared/FeedbackInput.component'
import ManageEnv from './ManageEnv.component'
import ManageMounts from './ManageMounts.component'
import ManagePorts from './ManagePorts.component'
import NotFound from '../shared/NotFound.component'
import { CityOnPlanet } from '../visuals/CityOnPlanet'

export default class CreateContainer extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
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
  }

  componentWillMount() {
    this.props.fetchResources()

    if (this.props.component) {
      this.setState({ color: this.props.component.get('color') })
    }

    this.backgroundCanvas = new CityOnPlanet(this.state.color)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.component !== newProps.component) {
      this.setState({ color: newProps.component.get('color') })

      this.backgroundCanvas.stop()
      this.backgroundCanvas = new CityOnPlanet(newProps.component.get('color'))
      this.backgroundCanvas.start()
    }
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  resourcesFound() {
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
              <aside className='col-2'>
                <p className='text-note'>
                  A <dfn>Container</dfn> deploys and runs a Docker Image.
                  Specify the image you wish to use.
                </p>
              </aside>

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
                  the Packing Algorithm will automatically maximize use of
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
                <button className='with-glyph glyph-right-arrow-action-color' type='submit'>
                  Create container
                </button>
              </div>
            </div>
          </div>

        </form>
      </section>
    )
  }

  render() {
    const { app, component } = this.props
    return app && component ? this.resourcesFound() : <NotFound />
  }
}
