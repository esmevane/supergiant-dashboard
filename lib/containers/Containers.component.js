import React from 'react'
import { Link } from 'react-router'
import ContainerResources from './ContainerResources.component'
import ContainerWelcome from './ContainerWelcome.component'
import FadeChange from '../shared/FadeChange.animation'
import Container from './Container.container.js'

export default class Containers extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    containers: React.PropTypes.object.isRequired,
    handleNew: React.PropTypes.func.isRequired
  }

  render() {
    const { app, component, containers, handleNew } = this.props

    return(
      <ContainerResources handleNew={ handleNew }>
        <FadeChange>
          { (containers.count() === 0) && <ContainerWelcome /> }
          {
            containers.map((container, index) => (
              <Container key={ index } container={ container } />
            ))
          }
        </FadeChange>
      </ContainerResources>
    )
  }
}
