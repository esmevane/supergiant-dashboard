import React from 'react'
import Keybindings from '../keybindings'

export default class Help extends React.Component {
  render() {
    return(
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
    )
  }
}
