import React from 'react'
import { hideModal } from '../modals/modals.actions'

const RecognizedKeys = { 27: { name: `Escape`, action: hideModal } }

const KeyboardControls = ComposedComponent => class extends React.Component {
  _controlsKeyUp = ({ keyCode }) => {
    if (Reflect.has(RecognizedKeys, keyCode)) {
      let { action, inputs } = Reflect.get(RecognizedKeys, keyCode)

      if (!inputs) {
        this.props.dispatch(action())
      } else {
        this.props.dispatch(Reflect.apply(action, null, inputs))
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
