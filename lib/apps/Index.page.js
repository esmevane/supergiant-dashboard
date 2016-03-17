import React from 'react'
import DraggableAppList from './DraggableAppList.container'

export default class Index extends React.Component {
  render() {
    const { children } = this.props

    return(
      <section className='apps'>
        { children ? children : <DraggableAppList /> }
      </section>
    )
  }
}
