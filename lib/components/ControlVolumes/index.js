import React from 'react'
import kebabCase from 'lodash/kebabCase'
import FlipChange from 'components/FlipChange'
import styles from './styles.module.css'
import ControlVolume from 'components/ControlVolume'

export default class ControlVolumes extends React.Component {
  render() {
    const { mounts, disabled } = this.props
    const add = event => {
      event.preventDefault()
      mounts.addField()
    }

    const remove = index => event => {
      event.preventDefault()
      mounts.removeField(index)
    }

    const toControl = (mount, index) =>
      <ControlVolume index={ index }
                     key={ index }
                     disabled={ disabled }
                     remove={ remove(index) }
                     { ...mount } />

    return(
      <div className={ styles.container }>
        <FlipChange transitionAppear={ true } transitionLeave={ true }>
          { mounts.map(toControl) }
        </FlipChange>
        <button onClick={ add } disabled={ disabled } >
          <span>Add a volume</span>
          <i className="fa fa-plus-circle" />
        </button>
      </div>
    )
  }
}
