import React from 'react'

import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import Fieldset from '../elements/Fieldset.component'
import Aside from '../elements/Aside.component'
import Row from '../elements/Row.component'
import TextNote from '../elements/TextNote.component'
import SubmitButton from '../elements/SubmitButton.component'
import EasyLabel from '../elements/EasyLabel.component'
import NoWrapSpan from '../elements/NoWrapSpan.component'
import appDefinition from '../apps/apps.definition'
import FeedbackInput from '../elements/FeedbackInput.component'
import { orbitingPlanet } from '../visuals/orbitingPlanet'

export default class CreateComponent extends React.Component {
  static propTypes = {
    initColor: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      color: React.PropTypes.object.isRequired
    }).isRequired
  }

  componentWillMount() { this.props.initColor() }
  componentDidMount() { orbitingPlanet.start() }
  componentWillUnmount() { orbitingPlanet.stop() }

  render() {
    const { fields: { color, name }, submit } = this.props
    const colorChange = newColor => color.onChange(newColor)

    return(
      <section className='create-component'>
        <ContextHeader>
          <ContextTitle>New Component</ContextTitle>
          <ContextMenu />
        </ContextHeader>

        <form onSubmit={ submit(this.props) }>
          <Row className='component-create-form'>
            <Aside size={ 2 }>
              <TextNote>
                A Component runs a singular function, such as a database or
                search appliance.
              </TextNote>

              <TextNote>
                An <dfn title={ appDefinition }> Application</dfn> can be made
                up of many Components.
              </TextNote>
            </Aside>

            <Fieldset className='component-create-form-fields' size={ 4 }>

              <EasyLabel>
                Name your new Component.

                <FeedbackInput type='text'
                               prompt='my-component'
                               value={ name }
                               className='easy'
                               autoFocus='true' />
              </EasyLabel>

              <br />
              <label>
                <SubmitButton>Create</SubmitButton>
              </label>
            </Fieldset>
          </Row>
        </form>
      </section>
    )
  }
}
