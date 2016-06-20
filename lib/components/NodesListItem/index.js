import React from 'react'
import styles from './styles.module.css'

export default class NodesListItem extends React.Component {
  static propTypes = { node: React.PropTypes.object.isRequired }

  render() {
    const { node } = this.props

    return(
      <div className={ styles.container }>
        <div className={ styles.header }>
          <div className={ styles.title }>
            { node.class }
          </div>
          <div className={ styles.subheader }>
            { node.name }
          </div>
          <div className={ styles.menu }>
            <a href={ `http://${node.external_ip}` } target='_blank'>
              Node address { node.external_ip }
            </a>
          </div>
        </div>
        <div className={ styles.resources }>
          <div className={ styles.resource }>
            <div className={ styles.meter }>
              <progress value={ node.cpuPercent() } max='100' />
            </div>
            <div className={ styles.detail }>
              ({ node.cpuPercent() }% CPU)
            </div>
          </div>
          <div className={ styles.resource }>
            <div className={ styles.meter }>
              <progress value={ node.ramPercent() } max='100' />
            </div>
            <div className={ styles.detail }>
              ({ node.ramPercent() }% RAM)
            </div>
          </div>
        </div>
      </div>
    )
  }
}
