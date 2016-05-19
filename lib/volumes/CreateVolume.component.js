import React from 'react'
import Aside from '../elements/Aside.component'
import ButtonGroup from '../elements/ButtonGroup.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import EasyLabel from '../elements/EasyLabel.component'
import Fieldset from '../elements/Fieldset.component'
import Row from '../elements/Row.component'
import SubmitButton from '../elements/SubmitButton.component'
import TextNote from '../elements/TextNote.component'
import containerDefinition from '../containers/containers.definition'
import FeedbackInput from '../elements/FeedbackInput.component'
import NotFound from '../shared/NotFound.component'
import { OrbitingSatellite } from '../visuals/orbitingSatellite'

export default class CreateVolume extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      size: React.PropTypes.object.isRequired,
      type: React.PropTypes.object.isRequired
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

    this.backgroundCanvas = new OrbitingSatellite(this.state.color)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.component !== newProps.component) {
      let color = newProps.component.get('color')

      this.setState({ color })

      this.backgroundCanvas.stop()
      this.backgroundCanvas = new OrbitingSatellite(color)
      this.backgroundCanvas.start()
    }
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  resourcesFound() {
    const { submit, fields: { name, size, type } } = this.props

    return(
      <section>
        <ContextHeader>
          <ContextTitle>Create New Volume</ContextTitle>
          <ContextMenu />
        </ContextHeader>

        <form onSubmit={ submit(this.props) }>
          <Row className='image-create-form'>
            <Aside size={ 2 }>
              <TextNote>
                A Volume is disk storage that can be mounted on
                a <dfn title={ containerDefinition }>Container</dfn>.
              </TextNote>

              <TextNote>
                Volumes can be shared between Containers.
              </TextNote>
            </Aside>

            <Fieldset className='component-create-form-fields' size={ 5 }>
              <EasyLabel>
                Name your new volume.
                <FeedbackInput type='text'
                               className='easy'
                               prompt='Volume name'
                               value={ name }
                               autoFocus='true' />
              </EasyLabel>

              <ButtonGroup>
                <label>
                  <input type='radio'
                         { ...type }
                         checked={ type.value === 'gp2' }
                         value='gp2' />
                  <span className='button'>SSD</span>
                </label>
                <label>
                  <input type='radio'
                         { ...type }
                         checked={ type.value === 'st1' }
                         value='st1' />
                  <span className='button'>Magnetic</span>
                </label>
                <label>
                  <input type='radio'
                         { ...type }
                         checked={ type.value === 'io1' }
                         value='io1' />
                  <span className='button'>IOPS</span>
                </label>
              </ButtonGroup>

              <br/>

              <EasyLabel>
                How big is the volume?
                <input type='text' { ...size } className='easy inline' /> GB
              </EasyLabel>

              <br />

              <label>
                <SubmitButton>Create Volume</SubmitButton>
              </label>
            </Fieldset>
          </Row>
        </form>
      </section>
    )
  }

  render() {
    const { component } = this.props

    return component ? this.resourcesFound() : <NotFound />
  }
}
