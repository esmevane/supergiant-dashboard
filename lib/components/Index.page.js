import React from 'react'
import NotFound from '../shared/NotFound.page'

export default class Index extends React.Component {
  render() {
    const { params: { appId } } = this.props

    let content

    if (appId) {
      content = (
        <section className='components'>
          { this.props.children }
        </section>
      )
    } else {
      content = <NotFound />
    }

    return content
  }
}
