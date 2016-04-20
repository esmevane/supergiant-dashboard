import React from 'react'
import SelectMinMax from '../shared/SelectMinMax.component'
import FeedbackInput from '../shared/FeedbackInput.component'
import ManageEnv from './ManageEnv.component'
import ManageMounts from './ManageMounts.component'
import ManagePorts from './ManagePorts.component'
import NotFound from '../shared/NotFound.component'
import { Link } from 'react-router'
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

  miliCpuToUnits(num, floor=1) {
    let number = parseFloat(num)

    if (isNaN(number) || (num < floor)) return ''

    return `${number / 1000 } CPU`
  }

  floatToDataUnits(num, floor=1) {
    let number  = parseFloat(num)
    let units   = 'KB'
    const oneKB = Math.pow(2, 10);
    const oneMB = Math.pow(2, 20);
    const oneGB = Math.pow(2, 30);
    const oneTB = Math.pow(2, 40);

    if (isNaN(number) || (number < floor)) return ''

    if (num < oneMB) {
      number = Math.round(num / oneKB * 100) / 100
    }
    else if (num >= oneMB && num < oneGB) {
      number = Math.round(num / oneMB * 100) / 100
      units = 'MB'
    }
    else if (num >= oneGB && num < oneTB) {
      number = Math.round(num / oneGB * 100) / 100
      units = 'GB'
    }
    else if (num >= oneTB) {
      number = Math.round(num / oneTB * 100) / 100
      units = 'TB'
    }

    return  `${number} ${units}`
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
                  If you want to use a public Dockerhub image, enter it here.
                </p>
                <p className='text-note'>
                  To use a private Docker image, you must first save
                  a <Link to='/settings'>Repository key.</Link>
                </p>
              </aside>

              <fieldset className='col-4'>
                <label className='easy'>Specify a Docker image.</label>
                <FeedbackInput autoFocus='true'
                               type='text'
                               className='easy'
                               prompt='docker/image'
                               value={ image } />
              </fieldset>
            </div>

            <br /><br />

            <div className='table-row'>
              <aside className='col-2'>
                <p className='text-note'>
                  Select the resources you want this Container to use
                  during high and low load times. Supergiant will automatically
                  scale Nodes within this range
                </p>
              </aside>

              <fieldset className='col-4'>
                <label className='easy'>Enter CPU values in thousanths.</label>

                <div className='select-min-max table-row'>
                  <div className='col-5'>
                    <label>
                      Min
                      <FeedbackInput type='number'
                                     min='1'
                                     className='easy'
                                     value={ cpu.min } />
                    </label>
                    { this.miliCpuToUnits(cpu.min.value, 1) }
                  </div>
                  <div className='col-5'>
                    <label>
                      Max
                      <FeedbackInput type='number'
                                     className='easy'
                                     value={ cpu.max } />
                    </label>
                    <p className='text-note'>
                      { this.miliCpuToUnits(cpu.max.value, 1) }
                    &nbsp;</p>
                  </div>
                </div>

                <label className='easy'>Enter RAM in bytes.</label>

                <div className='select-min-max table-row'>
                  <div className='col-5'>
                    <label>
                      Min
                      <FeedbackInput type='number'
                                     value={ ram.min } />
                    </label>
                    <p className='text-note'>
                      { this.floatToDataUnits(ram.min.value, 1) }
                    &nbsp;</p>
                  </div>
                  <div className='col-5'>
                    <label>
                      Max
                      <FeedbackInput type='number'
                                     value={ ram.max } />
                    </label>
                    <p className='text-note'>
                      { this.floatToDataUnits(ram.max.value, 1) }
                    &nbsp;</p>
                  </div>
                </div>
              </fieldset>
            </div>

            <br /><br />

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>
              <div className='col-6'>
                <ManageEnv env={ env } />
              </div>
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>
              <div className='col-6'>
                <ManageMounts mounts={ mounts } />
              </div>
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>
              <div className='col-6'>
                <ManagePorts ports={ ports } />
              </div>
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
    const { component } = this.props
    return component ? this.resourcesFound() : <NotFound />
  }
}
