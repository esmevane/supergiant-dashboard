import React from 'react'
import Keybindings from '../keybindings'

const Help = () =>
  <dl>
    {
      Object.values(Keybindings).map((keybinding, index) => (
        <div key={ index }>
          <dt>{ keybinding.name } ({ keybinding.code })</dt>
          <dd>{ keybinding.desc }</dd>
        </div>
      ))
    }
  </dl>

export default Help
