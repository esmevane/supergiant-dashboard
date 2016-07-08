import React from 'react'
import styles from './styles.module.css'

export default class ControlVariable extends React.Component {
  render() {
    const { index, name, value, disabled, remove } = this.props

    return(
      <div>
        <input placeholder='Variable name'
               type='text'
               { ...name }
               disabled={ disabled } />
        <input placeholder='Volume value'
               type='text'
               { ...value }
               disabled={ disabled } />
        <button onClick={ remove } disabled={ disabled } >
          <span>
            Remove this variable
          </span>
          <i className="fa fa-minus-circle" />
        </button>
      </div>

    )
  }
}
