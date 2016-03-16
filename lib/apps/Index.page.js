import React from 'react'
import DraggableAppList from './DraggableAppList.container'

export default class Index extends React.Component {
  render() {
    return(
      <section className='apps'>
        { this.props.children && this.props.children }
        { !this.props.children && <DraggableAppList /> }
      </section>
    )
  }
}
