import React from 'react'
import App from './App.container'
import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import DestroyButton from '../elements/DestroyButton.component'

const AppView = ({ app, deleteApp, opacity }) =>
  <div className='app-view' style={ { opacity } }>
    <ContextHeader>
      <ContextTitle>
        { app ? app.name : '...' }
      </ContextTitle>

      <ContextMenu>
        <DestroyButton onClick={ deleteApp } isAction={ true }>
          Destroy
        </DestroyButton>
      </ContextMenu>
    </ContextHeader>
    <div>
      { app && <App app={ app } /> }
    </div>
  </div>

AppView.propTypes = {
  app: React.PropTypes.object,
  deleteApp: React.PropTypes.func.isRequired,
  opacity: React.PropTypes.number.isRequired
}

export default AppView
