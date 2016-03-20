import React from 'react'
import Keybindings from '../keybindings'

function allKeysHeld(modifiers, event) {
  let reducer = (previous, current) => previous && current
  let keysHeld = modifiers.map(modifier => Reflect.get(event, modifier))

  return keysHeld.reduce(reducer, true)
}

const KeyboardControls = ComposedComponent => class extends React.Component {
  _controlsKeyUp = (event) => {
    let { keyCode } = event
    if (Reflect.has(Keybindings, keyCode)) {
      let recognizer = Reflect.get(Keybindings, keyCode)
      let modifiers = recognizer.modifiers || []

      if (allKeysHeld(modifiers, event)) {
        if (!recognizer.inputs) {
          this.props.dispatch(recognizer.action())
        } else {
          this.props.dispatch(Reflect.apply(recognizer.action, null, inputs))
        }
      }
    }
  }

  componentDidMount() {
    if (document) {
      document.addEventListener(`keyup`, this._controlsKeyUp, false)
    }
  }

  componentWillMount() {
    if (document) {
      document.removeEventListener(`keyup`, this._controlsKeyUp, false)
    }
  }

  render() { return(<ComposedComponent {...(this.props)} />) }
}

export default KeyboardControls
