import React from 'react'
import Entrypoints from '../entrypoints/Entrypoints.container'
import Registries from '../registries/Registries.container'

const Settings = () =>
  <div>
    <h1>Settings</h1>
    <div className='table-row'>
      <div className='col-5'>
        <Entrypoints />
      </div>
      <div className='col-5'>
        <Registries />
      </div>
    </div>
  </div>

export default Settings
