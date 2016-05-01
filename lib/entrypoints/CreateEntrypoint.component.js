import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import Aside from '../elements/Aside.component'
import Column from '../elements/Column.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import Row from '../elements/Row.component'
import SubmitButton from '../elements/SubmitButton.component'
import TextNote from '../elements/TextNote.component'
import FeedbackInput from '../elements/FeedbackInput.component'
import { BackgroundSupergiant } from '../visuals/supergiant'

export default class CreateEntrypoint extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      domain: React.PropTypes.object.isRequired,
    }).isRequired
  }

  componentWillMount() { this.backgroundCanvas = new BackgroundSupergiant() }
  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { submit, fields: { domain } } = this.props
    return(
      <section>
        <ContextHeader>
          <ContextTitle>Create a New Entrypoint</ContextTitle>
          <ContextMenu />
        </ContextHeader>

        <form onSubmit={ submit(this.props) }>

          <Row className='entrypoint-create'>
            <Column size={ 2 }>&nbsp;</Column>

            <Column size={ 10 }>
              <Row>
                <Column size={ 12 }>
                  <h4>Create a new entrypoint.</h4>
                </Column>
              </Row>

              <Row>
                <Column size={ 5 }>
                  <FeedbackInput type='text'
                                 prompt='example.com'
                                 className='easy'
                                 autoFocus='true'
                                 value={ domain }/>
                </Column>

                <Column size={ 3 }>
                  <SubmitButton>Create</SubmitButton>
                </Column>

                <Aside size={ 3 }>
                  <TextNote>
                    An entrypoint is a domain name, like <i>
                      example.com
                    </i> that may be reached from the outside world.
                  </TextNote>
                </Aside>
              </Row>
            </Column>
          </Row>

        </form>
      </section>
    )
  }
}
