import React from 'react'
import ArticleTable from '../elements/ArticleTable.component'
import Column from '../elements/Column.component'
import DestroyIcon from '../elements/DestroyIcon.component'
import TextNote from '../elements/TextNote.component'

const Volume = ({ destroy, volume }) =>
  <ArticleTable>
    <Column className='lined' size={ 7 }>
      <h4>{ volume.get('name') }</h4>
      <TextNote>{ volume.get('type') }</TextNote>
    </Column>

    <Column size={ 3 }>
      <h4>({ volume.get('size') } GB)</h4>
    </Column>

    <Column className='text-right' size={ 2 }>
      <DestroyIcon onClick={ destroy } />
      &nbsp;
      &nbsp;
    </Column>
  </ArticleTable>

Volume.propTypes = {
  volume: React.PropTypes.object.isRequired,
  destroy: React.PropTypes.func.isRequired
}

export default Volume
