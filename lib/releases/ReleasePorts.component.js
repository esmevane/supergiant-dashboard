import React from 'react'
import TextNote from '../elements/TextNote.component'
import ReleasePort from './ReleasePort.component'

const ReleasePorts = ({ ports }) =>
  <div>
    <h5>Ports</h5>
    {
      ports.count() === 0 && (
        <TextNote>No ports defined.</TextNote>
      )
    }
    {
      ports.count() > 0 && (
        <table>
          <thead>
            <tr>
              <th>Protocol</th>
              <th>Public?</th>
              <th>External port number</th>
              <th>Internal port number</th>
              <th>Exposed on domain</th>
            </tr>
          </thead>
          <tbody>
            {
              ports.map((port, index) => (
                <ReleasePort port={ port } key={ index } />)
              )
            }
          </tbody>
        </table>
      )
    }
  </div>

ReleasePorts.propTypes = { ports: React.PropTypes.object.isRequired }

export default ReleasePorts
