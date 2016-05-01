import React from 'react'
import AddIcon from '../elements/AddIcon.component'
import DestroyIcon from '../elements/DestroyIcon.component'
import Column from '../elements/Column.component'
import EasyLabel from '../elements/EasyLabel.component'
import Fieldset from '../elements/Fieldset.component'
import Line from '../elements/Line.component'
import TableRow from '../elements/TableRow.component'
import FeedbackInput from '../elements/FeedbackInput.component'

const port = React.PropTypes.shape({
  protocol: React.PropTypes.object.isRequired,
  number: React.PropTypes.object.isRequired,
  public: React.PropTypes.object,
  external_number: React.PropTypes.object,
  entrypoint_domain: React.PropTypes.object
})

const PortForm = ({ index, port, ports }) =>
  <Line>
    <TableRow>
      <Column size={ 4 }>
        <FeedbackInput type='number'
                       prompt='port number'
                       autoFocus='true'
                       value={ port.number } />
      </Column>
      <Column size={ 4 }>
        <FeedbackInput type='text'
                       prompt='port protocol'
                       value={ port.protocol } />
      </Column>
      <Column size={ 3 }>
        <EasyLabel>
          <FeedbackInput type='checkbox'
                         prompt=''
                         value={ port.public } />
          &nbsp;
          &nbsp;
          Public?
        </EasyLabel>
      </Column>
      <Column className='text-right' size={ 1 }>
        <DestroyIcon onClick={ () => ports.removeField(index) } />
      </Column>
    </TableRow>
    {
      port.public.value && (
        <TableRow>
          <Column size={ 4 }>
            <FeedbackInput type='number'
                           prompt='external port number'
                           value={ port.external_number } />
          </Column>
          <Column size={ 7 }>
            <FeedbackInput type='text'
                           prompt='entry domain'
                           value={ port.entrypoint_domain } />
          </Column>
          <Column size={ 1 }/>
        </TableRow>
      )
    }
  </Line>

PortForm.propTypes = {
  ports: React.PropTypes.arrayOf(port.isRequired).isRequired,
  port: port.isRequired,
  index: React.PropTypes.number.isRequired
}

const ManagePorts = ({ ports }) =>
  <Fieldset className='line-items pad' size={ 12 }>
    <h4>Expose ports</h4>

    {
      ports.map((port, index) => (
        <PortForm key={ index }
                  index={ index }
                  port={ port }
                  ports={ ports } />
      ))
    }

    <Line>
      <AddIcon onClick={ () => ports.addField() } />
    </Line>
  </Fieldset>

ManagePorts.propTypes = {
  ports: React.PropTypes.arrayOf(port.isRequired).isRequired
}

export default ManagePorts
