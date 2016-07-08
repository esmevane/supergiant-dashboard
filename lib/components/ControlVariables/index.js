import React from 'react'
import FlipChange from 'components/FlipChange'
import ControlVariable from 'components/ControlVariable'
import styles from './styles.module.css'

export default class ControlVariables extends React.Component {
  render() {
    const { variables, disabled } = this.props
    const add = event => {
      event.preventDefault()
      variables.addField()
    }

    const remove = index => event => {
      event.preventDefault()
      variables.removeField(index)
    }

    const toControl = (variable, index) =>
      <ControlVariable index={ index }
                       key={ index }
                       disabled={ disabled }
                       remove={ remove(index) }
                       { ...variable } />

    return(
      <div>
        <FlipChange transitionAppear={ true } transitionLeave={ true }>
          { variables.map(toControl) }
        </FlipChange>
        <button onClick={ add } disabled={ disabled } >
          <span>Add a variable</span>
          <i className="fa fa-plus-circle" />
        </button>
      </div>
    )
  }
}
