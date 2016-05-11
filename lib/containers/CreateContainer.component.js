import React from 'react'
import FeedbackInput from '../elements/FeedbackInput.component'
import ManageEnv from './ManageEnv.component'
import ManageCommands from './ManageCommands.component'
import ManageMounts from './ManageMounts.component'
import ManagePorts from './ManagePorts.component'
import NotFound from '../shared/NotFound.component'
import { Link } from 'react-router'
import { floatToDataUnits, floatFloorToPlaces } from '../shared/normalizers'
import { CityOnPlanet } from '../visuals/cityOnPlanet'

import Aside from '../elements/Aside.component'
import Column from '../elements/Column.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import EasyLabel from '../elements/EasyLabel.component'
import Fieldset from '../elements/Fieldset.component'
import Row from '../elements/Row.component'
import SubmitButton from '../elements/SubmitButton.component'
import TextNote from '../elements/TextNote.component'

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
        <ContextHeader>
          <ContextTitle>Create a New Container</ContextTitle>
          <ContextMenu />
        </ContextHeader>

        <form onSubmit={ submit(this.props) }>
          <div className='container-create-form'>

            <Row>
              <Aside size={ 2 }>
                <TextNote>
                  If you want to use a public Dockerhub image, enter it here.
                </TextNote>
                <TextNote>
                  To use a private Docker image, you must first save
                  a <Link to='/settings'>Repository key.</Link>
                </TextNote>
              </Aside>

              <Fieldset size={ 5 }>
                <EasyLabel>Specify a Docker image.</EasyLabel>
                <FeedbackInput autoFocus='true'
                               type='text'
                               className='easy'
                               prompt='docker/image'
                               value={ image } />
              </Fieldset>
            </Row>

            <br />
            <br />

            <Row>
              <Aside size={ 2 }>
                <TextNote>
                  Select the resources you want this Container to use
                  during high and low load times. Supergiant will automatically
                  scale Nodes within this range
                </TextNote>
              </Aside>

              <Fieldset size={ 4 }>
                <EasyLabel>Enter CPU values in decimals.</EasyLabel>

                <Row className='select-min-max'>
                  <Column size={ 6 }>
                    <label>
                      Min
                      <FeedbackInput type='number'
                                     min='0'
                                     prompt='ex: 0.125'
                                     className='easy'
                                     value={ cpu.min } />
                    </label>
                    <TextNote>
                      { floatFloorToPlaces(cpu.min.value, 3) }
                    </TextNote>
                  </Column>
                  <Column size={ 6 }>
                    <label>
                      Max
                      <FeedbackInput type='number'
                                     min='0'
                                     prompt='ex: 0.5'
                                     className='easy'
                                     value={ cpu.max } />
                    </label>
                    <TextNote>
                      { floatFloorToPlaces(cpu.max.value, 3) }
                      &nbsp;
                    </TextNote>
                  </Column>
                </Row>

                <EasyLabel>Enter RAM in bytes.</EasyLabel>

                <Row className='select-min-max'>
                  <Column size={ 6 }>
                    <label>
                      Min
                      <FeedbackInput type='number' min='0' value={ ram.min } />
                    </label>
                    <TextNote>
                      { floatToDataUnits(ram.min.value) }
                      &nbsp;
                    </TextNote>
                  </Column>
                  <Column size={ 6 }>
                    <label>
                      Max
                      <FeedbackInput type='number' min='0' value={ ram.max } />
                    </label>
                    <TextNote>
                      { floatToDataUnits(ram.max.value) }
                      &nbsp;
                    </TextNote>
                  </Column>
                </Row>
              </Fieldset>
            </Row>

            <br />
            <br />

            <Row>
              <Aside size={ 2 } />
              <Column size={ 6 }>
                <ManageCommands commands={ commands } />
              </Column>
            </Row>

            <br />

            <Row>
              <Aside size={ 2 } />
              <Column size={ 6 }>
                <ManageEnv env={ env } />
              </Column>
            </Row>

            <br />

            <Row>
              <Aside size={ 2 } />
              <Column size={ 6 }>
                <ManageMounts mounts={ mounts } />
              </Column>
            </Row>

            <br />

            <Row>
              <Aside size={ 2 } />
              <Column size={ 6 }>
                <ManagePorts ports={ ports } />
              </Column>
            </Row>

            <br />

            <Row>
              <Aside size={ 2 } />
              <Column size={ 4 }>
                <SubmitButton>Create container</SubmitButton>
              </Column>
            </Row>
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
