import React from 'react'
import styles from './styles.module.css'

export default class ComponentAddresses extends React.Component {
  render() {
    const { component } = this.props
    const internals = component.internalAddresses()
    const externals = component.externalAddresses()

    return(
      <div className={ styles.addresses }>
        <div className={ styles.internals }>
          { internals.map((item, index) => <div key={ index }>{ item }</div>) }
        </div>
        <div className={ styles.externals }>
          { externals.map((item, index) => <div key={ index }>{ item }</div>) }
        </div>
      </div>
    )
  }
}
