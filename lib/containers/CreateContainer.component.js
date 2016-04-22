import React from 'react'
import SelectMinMax from '../shared/SelectMinMax.component'
import FeedbackInput from '../shared/FeedbackInput.component'
import ManageEnv from './ManageEnv.component'
import ManageCommands from './ManageCommands.component'
import ManageMounts from './ManageMounts.component'
import ManagePorts from './ManagePorts.component'
import NotFound from '../shared/NotFound.component'
import { Link } from 'react-router'
import { floatToDataUnits, floatFloorToPlaces } from '../shared/normalizers'
import { CityOnPlanet } from '../visuals/cityOnPlanet'


export default class CreateContainer extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      commands: React.PropTypes.array.isRequired,
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
    const { image, cpu, ram, mounts, ports, env, commands } = this.props.fields
    const { submit } = this.props

    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create a New Container</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>
          <div className='container-create-form'>

            <div className='row'>
              <aside className='col-2'>
                <p className='text-note'>
                  If you want to use a public Dockerhub image, enter it here.
                </p>
                <p className='text-note'>
                  To use a private Docker image, you must first save
                  a <Link to='/settings'>Repository key.</Link>
                </p>
              </aside>

              <fieldset className='col-5'>
                <label className='easy'>Specify a Docker image.</label>
                <FeedbackInput autoFocus='true'
                               type='text'
                               className='easy'
                               prompt='docker/image'
                               value={ image } />
              </fieldset>
            </div>

            <br /><br />

            <div className='row'>
              <aside className='col-2'>
                <p className='text-note'>
                  Select the resources you want this Container to use
                  during high and low load times. Supergiant will automatically
                  scale Nodes within this range
                </p>
              </aside>

              <fieldset className='col-4'>
                <label className='easy'>Enter CPU values in decimals.</label>

                <div className='select-min-max row'>
                  <div className='col-6'>
                    <label>
                      Min
                      <FeedbackInput type='number'
                                     min='0'
                                     prompt='ex: 0.125'
                                     className='easy'
                                     value={ cpu.min } />
                    </label>
                    <p className='text-note'>
                      { floatFloorToPlaces(cpu.min.value, 3) }
                    </p>
                  </div>
                  <div className='col-6'>
                    <label>
                      Max
                      <FeedbackInput type='number'
                                     min='0'
                                     prompt='ex: 0.5'
                                     className='easy'
                                     value={ cpu.max } />
                    </label>
                    <p className='text-note'>
                      { floatFloorToPlaces(cpu.max.value, 3) }
                    &nbsp;</p>
                  </div>
                </div>

                <label className='easy'>Enter RAM in bytes.</label>

                <div className='select-min-max row'>
                  <div className='col-6'>
                    <label>
                      Min
                      <FeedbackInput type='number'
                                     min='0'
                                     value={ ram.min } />
                    </label>
                    <p className='text-note'>
                      { floatToDataUnits(ram.min.value) }
                    &nbsp;</p>
                  </div>
                  <div className='col-6'>
                    <label>
                      Max
                      <FeedbackInput type='number'
                                     min='0'
                                     value={ ram.max } />
                    </label>
                    <p className='text-note'>
                      { floatToDataUnits(ram.max.value) }
                    &nbsp;</p>
                  </div>
                </div>
              </fieldset>
            </div>

            <br /><br />

            <div className='row'>
              <aside className='col-2' />
              <div className='col-6'>
                <ManageCommands commands={ commands } />
              </div>
            </div>

            <br />

            <div className='row'>
              <aside className='col-2' />
              <div className='col-6'>
                <ManageEnv env={ env } />
              </div>
            </div>

            <br />

            <div className='row'>
              <aside className='col-2' />
              <div className='col-6'>
                <ManageMounts mounts={ mounts } />
              </div>
            </div>

            <br />

            <div className='row'>
              <aside className='col-2' />
              <div className='col-6'>
                <ManagePorts ports={ ports } />
              </div>
            </div>

            <br />

            <div className='row'>
              <aside className='col-2' />
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
    const { component } = this.props
    return component ? this.resourcesFound() : <NotFound />
  }
}
