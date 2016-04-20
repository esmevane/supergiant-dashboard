import React from 'react'
import Instance from './Instance.component'

export default class Instances extends React.Component {
  static propTypes = {
    instances: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { instances } = this.props
    return(
      <div className='context-system-resources'>
        <header>
          <h2>Instances</h2>

          { instances.count() < 1 && (
            <aside>
              <p className='text-note'>
                When this Component is running, Container Instance stats will
                be shown here.
              </p>
              <p className='text-note'>
                You have no running instances.
              </p>
            </aside>
          )}
        </header>

        <ul className='resources-list'>
          {
            instances.map((instance, index) => (
              <Instance instance={ instance } key={ index } />
            ))
          }
        </ul>
      </div>
    )
  }

  render() {
    const { instances } = this.props
    return instances ? this.resourcesFound() : <div />
  }
}
