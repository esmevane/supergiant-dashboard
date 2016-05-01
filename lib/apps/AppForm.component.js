import React from 'react'
import { kebabCase } from 'lodash'
import AppSection from './AppSection.component'
import CreateAppOverview from './CreateAppOverview.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import SubmitButton from '../elements/SubmitButton.component'
import Column from '../elements/Column.component'
import Fieldset from '../elements/Fieldset.component'
import Row from '../elements/Row.component'
import FeedbackInput from '../elements/FeedbackInput.component'

const AppForm = ({ submit, name }) =>
  <AppSection>
    <ContextHeader>
      <ContextTitle>Create a New App</ContextTitle>
      <ContextMenu />
    </ContextHeader>

    <form onSubmit={ submit }>
      <Row className='app-form'>
        <Column size={ 2 } />
        <Fieldset size={ 10 }>
          <Row>
            <Column size={ 12 }>
              <h4>Name your new application.</h4>
            </Column>
          </Row>
          <Row>
            <Column size={ 5 }>
              <FeedbackInput prompt='my-production-app'
                             type='text'
                             value={ name }
                             className='easy'
                             autoFocus='true' />
              <div>
                { name.value && <span>{ kebabCase(name.value) }</span> }
              </div>
            </Column>
            <Column size={ 3 }>
              <SubmitButton>Create App</SubmitButton>
            </Column>
            <CreateAppOverview />
          </Row>
        </Fieldset>
      </Row>
    </form>
  </AppSection>

AppForm.propTypes = {
  submit: React.PropTypes.func.isRequired,
  name: React.PropTypes.object.isRequired
}

export default AppForm
