import React from 'react'
import AppList from '../components/AppList'

export default class AppsIndex extends React.Component {
  render() {
    return(
      <section className='apps'>
        { this.props.children && this.props.children }
        { !this.props.children && <AppList /> }
      </section>
    )
  }
}
