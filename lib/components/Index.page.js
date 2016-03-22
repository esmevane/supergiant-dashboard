import React from 'react'
import NotFound from '../shared/NotFound.page'

export default class Index extends React.Component {
  render() {
    const { params: { appId } } = this.props

    if (appId) {
      return(
        <h3>Hello!</h3>
      )
    } else {
      return <NotFound />
    }
  }
}
