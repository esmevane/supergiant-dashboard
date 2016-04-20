import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

const mount = React.PropTypes.shape({
  volume: React.PropTypes.object.isRequired,
  path: React.PropTypes.object.isRequired
})

const MountForm = ({ index, mount, mounts }) =>
  <div className='table-row line'>
    <div className='col-4'>
      <FeedbackInput type='text'
                     prompt='volume name'
                     autoFocus='true'
                     value={ mount.volume } />
    </div>
    <div className='col-6'>
      <FeedbackInput type='text'
                     prompt='mount path'
                     value={ mount.path } />
    </div>
    <div className='col-1 text-right pull-right'>
      <button className='glyph glyph-x' onClick={
        event => {
          event.preventDefault()
          mounts.removeField(index)
        }
      } />
    </div>
  </div>

MountForm.propTypes = {
  mounts: React.PropTypes.arrayOf(mount.isRequired).isRequired,
  mount: mount.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManageMounts = ({ mounts }) =>
  <fieldset className='line-items'>
    <h4>Volume mount points</h4>

    {
      mounts.map((mount, index) => (
        <MountForm mounts={ mounts }
                   key={ index }
                   mount={ mount }
                   index={ index } />
      ))
    }

    <div className='line'>
      <button className='glyph glyph-plus' onClick={
        event => {
          event.preventDefault()
          mounts.addField()
        }
      } />
    </div>
  </fieldset>

ManageMounts.propTypes = {
  mounts: React.PropTypes.arrayOf(mount.isRequired).isRequired
}

export default ManageMounts
