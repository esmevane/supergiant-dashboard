import React from 'react'
import AddIcon from '../elements/AddIcon.component'
import DestroyIcon from '../elements/DestroyIcon.component'
import Column from '../elements/Column.component'
import Fieldset from '../elements/Fieldset.component'
import Line from '../elements/Line.component'
import FeedbackInput from '../elements/FeedbackInput.component'

const mount = React.PropTypes.shape({
  volume: React.PropTypes.object.isRequired,
  path: React.PropTypes.object.isRequired
})

const MountForm = ({ index, mount, mounts }) =>
  <Line className='table-row'>
    <Column size={ 4 }>
      <FeedbackInput type='text'
                     prompt='volume name'
                     autoFocus='true'
                     value={ mount.volume } />
    </Column>
    <Column size={ 7 }>
      <FeedbackInput type='text'
                     prompt='mount path'
                     value={ mount.path } />
    </Column>
    <Column className='text-right' size={ 1 }>
      <DestroyIcon onClick={
        event => {
          event.preventDefault()
          mounts.removeField(index)
        }
      } />
    </Column>
  </Line>

MountForm.propTypes = {
  mounts: React.PropTypes.arrayOf(mount.isRequired).isRequired,
  mount: mount.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManageMounts = ({ mounts }) =>
  <Fieldset className='line-items pad'>
    <h4>Volume mount points</h4>

    {
      mounts.map((mount, index) => (
        <MountForm mounts={ mounts }
                   key={ index }
                   mount={ mount }
                   index={ index } />
      ))
    }

    <Line>
      <AddIcon onClick={
        event => {
          event.preventDefault()
          mounts.addField()
        }
      } />
    </Line>
  </Fieldset>

ManageMounts.propTypes = {
  mounts: React.PropTypes.arrayOf(mount.isRequired).isRequired
}

export default ManageMounts
