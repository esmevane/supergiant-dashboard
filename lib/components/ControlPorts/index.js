import React from 'react'
import FlipChange from 'components/FlipChange'
import ControlPort from 'components/ControlPort'
import styles from './styles.module.css'

export default class ControlPorts extends React.Component {
  render() {
    const { ports, disabled } = this.props
    const add = event => {
      event.preventDefault()
      ports.addField()
    }

    const remove = index => event => {
      event.preventDefault()
      ports.removeField(index)
    }

    const toControl = (port, index) =>
      <ControlPort index={ index }
                   key={ index }
                   disabled={ disabled }
                   remove={ remove(index) }
                   { ...port } />

    return(
      <div>
        <FlipChange transitionAppear={ true } transitionLeave={ true }>
          { ports.map(toControl) }
        </FlipChange>
        <button onClick={ add } disabled={ disabled } >
          <span>Expose a port</span>
          <i className="fa fa-plus-circle" />
        </button>
      </div>
    )
  }
}
