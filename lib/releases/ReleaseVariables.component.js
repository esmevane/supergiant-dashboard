import React from 'react'
import ReleaseVariable from './ReleaseVariable.component'

const ReleaseVariables = ({ env }) =>
  <div>
    <h5>Env Variables</h5>
    {
      env.count() == 0 && (
        <p className='text-note'>No environment variables set.</p>
      )
    }
    {
      env.count() > 0 && (
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {
              env.map((variable, index) => (
                <ReleaseVariable variable={ variable } key={ index } />
              ))
            }
          </tbody>
        </table>
      )
    }
  </div>

ReleaseVariables.propTypes = { env: React.PropTypes.object.isRequired }

export default ReleaseVariables
