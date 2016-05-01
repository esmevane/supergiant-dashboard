import React from 'react'
import Aside from '../elements/Aside.component'
import Column from '../elements/Column.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import EasyLabel from '../elements/EasyLabel.component'
import Fieldset from '../elements/Fieldset.component'
import SubmitButton from '../elements/SubmitButton.component'
import TableRow from '../elements/TableRow.component'
import TextNote from '../elements/TextNote.component'
import FeedbackInput from '../elements/FeedbackInput.component'
import { DockerConstellation } from '../visuals/dockerConstellation'

export default class CreateRegistry extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      password: React.PropTypes.object.isRequired,
      username: React.PropTypes.object.isRequired
    }).isRequired
  }

  componentWillMount() { this.backgroundCanvas = new DockerConstellation() }
  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { submit, fields } = this.props
    const { name, username, password, email } = fields
    return(
      <section>
        <ContextHeader>
          <ContextTitle>Connect to a Docker Repository</ContextTitle>
          <ContextMenu />
        </ContextHeader>

        <form onSubmit={ submit(this.props) }>
          <TableRow className='repository-create'>
            <Column size={ 2 }>
              <Aside size={ 12 }>
                <TextNote>
                  Connect to any number of private docker repositories by adding
                  repository credentials.
                </TextNote>

                <TextNote>
                  When you add an image to a Component, Supergiant will
                  automatically use the correct credentials.
                </TextNote>
              </Aside>
            </Column>

            <Fieldset size={ 5 }>
              <EasyLabel>
                Name your Repository.
                <FeedbackInput type='text'
                               className='easy'
                               prompt='Docker Repository Name'
                               autoFocus='true'
                               value={ name } />
              </EasyLabel>
            </Fieldset>
          </TableRow>

          <TableRow>
            <Column size={ 2 }>
              &nbsp;
            </Column>

            <Fieldset size={ 4 }>
              <EasyLabel>Enter repository credentials.</EasyLabel>

              <label>
                <FeedbackInput type='email'
                               prompt='email'
                               value={ email } />
              </label>

              <label>
                <FeedbackInput type='text'
                               prompt='username'
                               value={ username } />
              </label>

              <label>
                <FeedbackInput type='password'
                               prompt='password'
                               value={ password } />
              </label>

              <br />
              <br />
              <br />

              <SubmitButton>
                Save
              </SubmitButton>
            </Fieldset>
          </TableRow>
        </form>
      </section>
    )
  }
}
