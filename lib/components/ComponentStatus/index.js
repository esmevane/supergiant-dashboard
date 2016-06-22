import React from 'react'
import styles from './styles.module.css'

export default class ComponentStatus extends React.Component {
  render() {
    const { component } = this.props

    return(
      <div>
        {
          component.target_release_id && (
            <div className={ styles.running }>
              This component has a pending release.
            </div>
          )
        }
        {
          component.current_release_id && (
            <div className={ styles.running }>
              This component is running.
            </div>
          )
        }
      </div>
    )
  }
}
