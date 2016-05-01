import React from 'react'
import ContextHeader from './ContextHeader.component'
import ContextTitle from './ContextTitle.component'
import ContextMenu from './ContextMenu.component'
import Column from './Column.component'
import Row from './Row.component'
import Entrypoints from '../entrypoints/Entrypoints.container'
import Registries from '../registries/Registries.container'

const Settings = () =>
  <div className='settings'>
    <ContextHeader>
      <ContextTitle>Settings</ContextTitle>
      <ContextMenu />
    </ContextHeader>

    <Row className='supergiant-settings'>
      <Column className='context-data pad' size={ 7 }>
        <Entrypoints />
      </Column>

      <Column className='context-data pad' size={ 5 }>
        <Registries />
      </Column>
    </Row>
  </div>

export default Settings
