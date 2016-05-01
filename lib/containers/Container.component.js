import React from 'react'
import ArticleTable from '../elements/ArticleTable.component'
import Column from '../elements/Column.component'
import TextNote from '../elements/TextNote.component'
import DestroyIcon from '../elements/DestroyIcon.component'

export default class Container extends React.Component {
  static propTypes = {
    container: React.PropTypes.object.isRequired,
    destroy: React.PropTypes.func.isRequired
  }

  render() {
    const { container, destroy } = this.props

    return(
      <ArticleTable>
        <Column size={ 10 }>
          <h4>
            { container.get('image') }
          </h4>
          <TextNote>
            {
              container.get('env').count()
            } env variables | {
              container.get('ports').count()
            } open ports
          </TextNote>
        </Column>
        <Column className='text-right' size={ 2 }>
          <DestroyIcon onClick={ destroy } />
          &nbsp; &nbsp;
        </Column>
      </ArticleTable>
    )
  }
}
