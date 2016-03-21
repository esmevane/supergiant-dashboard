import React from 'react'
import ButtonLink from '../shared/ButtonLink.container'
import { isMap, isList } from '../shared/immutable.prop-types'
import DraggableComponents from '../components/DraggableComponents.container'

export default class AppDetail extends React.Component {
  static propTypes = { app: isMap, components: isList }

  render() {
    const { app, components } = this.props
    return(
      <article className='apps-detail'>
        <header>
          <h3>{ app.get('name') }</h3>
          <h4>{ app.get('id') }</h4>
        </header>
        <div className='apps-detail-main'>
          <DraggableComponents app={ app } components={ components } />
        </div>
        <footer>
          <ButtonLink to='/'>Back to Dashboard</ButtonLink>
        </footer>
      </article>
    )
  }
}
