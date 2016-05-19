import React from 'react'
import App from './App.container'
import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextFooter from '../elements/ContextFooter.component'
import DestroyButton from '../elements/DestroyButton.component'
import InlineTextNote from '../elements/InlineTextNote.component'

const AppView = ({ app, className = ``, deleteApp, opacity = 0.5 }) =>
  <div className={ `app-view ${className}` } style={ { opacity } }>
    <ContextHeader>
      <ContextTitle>
        { app ? app.displayName() : '...' }
        <InlineTextNote> { app ? `(${app.name})` : '(...)' }</InlineTextNote>
      </ContextTitle>

      <ContextMenu />
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
