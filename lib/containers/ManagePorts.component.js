import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'

const port = React.PropTypes.shape({
  protocol: React.PropTypes.object.isRequired,
  number: React.PropTypes.object.isRequired,
  public: React.PropTypes.object,
  external_number: React.PropTypes.object,
  entrypoint_domain: React.PropTypes.object
})

const PortForm = ({ index, port, ports }) =>
  <div className='line'>
    <div className='table-row'>
      <div className='col-4'>
        <FeedbackInput type='number'
                       prompt='port number'
                       autoFocus='true'
                       value={ port.number } />
      </div>
      <div className='col-4'>
        <FeedbackInput type='text'
                       prompt='port protocol'
                       value={ port.protocol } />
      </div>
      <div className='col-3'>
        <label className='easy'>
          <FeedbackInput type='checkbox'
                         prompt=''
                         value={ port.public } />
          &nbsp;&nbsp;Public?
        </label>
      </div>
      <div className='col-1 text-right'>
        <button className='glyph glyph-x' onClick={
          event => {
            event.preventDefault()
            ports.removeField(index)
          }
        } />
      </div>
    </div>
    {
      port.public.value && (
        <div className='table-row'>
          <div className='col-4'>
            <FeedbackInput type='number'
                           prompt='external port number'
                           value={ port.external_number } />
          </div>
          <div className='col-7'>
            <FeedbackInput type='text'
                           prompt='entry domain'
                           value={ port.entrypoint_domain } />
          </div>
          <div className='col-1' />
        </div>
      )
    }
  </div>

PortForm.propTypes = {
  ports: React.PropTypes.arrayOf(port.isRequired).isRequired,
  port: port.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManagePorts = ({ ports }) =>
  <fieldset className='line-items pad'>
    <h4>Expose ports</h4>

    {
      ports.map((port, index) => (
        <PortForm key={ index }
                  index={ index }
                  port={ port }
                  ports={ ports } />
      ))
    }

    <div className='line'>
      <button className='glyph glyph-plus' onClick={
        event => {
          event.preventDefault()
          ports.addField()
        }
      } />
    </div>
  </fieldset>


ManagePorts.propTypes = {
  ports: React.PropTypes.arrayOf(port.isRequired).isRequired
}

export default ManagePorts
