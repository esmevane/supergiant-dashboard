import React from 'react'
import ListApps from './ListApps.component'

export default class Index extends React.Component {
  render() {
    return(
      <section className='apps'>
        { this.props.children && this.props.children }
        { !this.props.children && <ListApps /> }
      </section>
    )
  }
}
