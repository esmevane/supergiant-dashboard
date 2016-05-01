import React from 'react'
import { Link } from 'react-router'
import Aside from '../elements/Aside.component'
import Column from '../elements/Column.component'
import TextNote from '../elements/TextNote.component'
import NotFound from '../shared/NotFound.component'

export default class ReleaseSummary extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired,
    current: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    releasesUri: React.PropTypes.string.isRequired,
    target: React.PropTypes.object
  }

  componentWillMount() { this.props.fetchResources() }

  resourcesFound() {
    const { current, releasesUri, target } = this.props
    const latest = current.get('created') ? current : target
    const created = latest.get('created') || ''

    return(
      <Column size={ 3 }>
        <h3>
          { created.split(' ').slice(0, 3).join(' ') }
        </h3>
        { latest === current && (<TextNote>Latest release</TextNote>) }
        { latest === target && (<TextNote>No latest release</TextNote>) }
        <p>
          <Link to={ releasesUri }>view release log</Link>
        </p>
      </Column>
    )
  }

  render() {
    const { current, target } = this.props
    return(
      <Column size={ 3 }>
        { target && current ? this.resourcesFound() : <NotFound /> }
      </Column>
    )
  }
}
