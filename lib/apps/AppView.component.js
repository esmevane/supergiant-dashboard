import React from 'react'
import App from './App.container'
import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextFooter from '../elements/ContextFooter.component'
import DestroyButton from '../elements/DestroyButton.component'

const AppView = ({ app, deleteApp, opacity }) =>
  <div className='app-view' style={ { opacity } }>
    <ContextHeader>
      <ContextTitle>
        { app ? app.name : '...' }
      </ContextTitle>

      <ContextMenu>
      </ContextMenu>
    </ContextHeader>

    <div>
      { app && <App app={ app } /> }
    </div>

    <ContextFooter>
      <DestroyButton onClick={ deleteApp } isAction={ true } className='small'>
        Delete App
      </DestroyButton>
    </ContextFooter>
  </div>

AppView.propTypes = {
  app: React.PropTypes.object,
  deleteApp: React.PropTypes.func.isRequired,
  opacity: React.PropTypes.number.isRequired
}

export default AppView
