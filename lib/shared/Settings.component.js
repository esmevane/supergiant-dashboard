import React from 'react'
import Entrypoints from '../entrypoints/Entrypoints.container'
import Registries from '../registries/Registries.container'

const Settings = () =>
<div className='settings'>
  <header className='context-header'>
    <div className='context-title'>Settings</div>
    <div className='context-menu' />
  </header>

  <div className='row'>
    <div className='context-data col-6 pad'>
      <Entrypoints />
    </div>

    <div className='context-data col-6 pad'>
      <Registries />
    </div>
  </div>
</div>

export default Settings
