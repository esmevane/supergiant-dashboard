import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { orbitingSatellite } from '../visuals/orbitingSatellite'

const SelectMinMax = ({ min, max }) =>
  <div>
    <label>
      Min
      <FeedbackInput prompt="min" type='number' value={ min } />
    </label>
    <label>
      Max
      <FeedbackInput prompt="max" type='number' value={ max } />
    </label>
  </div>

export default class ContainerForm extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    image: React.PropTypes.object.isRequired,
    cpu: React.PropTypes.object.isRequired,
    ram: React.PropTypes.object.isRequired,
    mounts: React.PropTypes.array.isRequired,
    ports: React.PropTypes.array.isRequired,
    env: React.PropTypes.array.isRequired
  }

  componentDidMount() { orbitingSatellite.start() }
  componentWillUnmount() { orbitingSatellite.stop() }

  render() {
    const { image, cpu, ram, mounts, ports, env, submit } = this.props

    return(
      <form onSubmit={ submit }>
        <FeedbackInput type='text' prompt='select an image' value={ image } />
        <div>
          CPU
          <SelectMinMax { ...cpu } />
        </div>
        <div>
          RAM
          <SelectMinMax { ...ram } />
        </div>
        <div>
          Environment variables
          <button onClick={
            event => {
              event.preventDefault()
              env.addField()
            }
          }>
            Add an environment variable
          </button>
          { !env.length && <div>No environment variables set</div> }
          {
            env.map((variable, index) => (
              <div key={ index }>
                <FeedbackInput type='text'
                               prompt='variable name'
                               value={ variable.name } />
                <FeedbackInput type='text'
                               prompt='variable value'
                               value={ variable.value } />
                <button onClick={
                  event => {
                    event.preventDefault()
                    env.removeField(index)
                  }
                }>
                  Remove this variable
                </button>
              </div>
            ))
          }
        </div>
        <div>
          Volume mount points
          <button onClick={
            event => {
              event.preventDefault()
              mounts.addField()
            }
          }>
            Mount a volume
          </button>
          { !mounts.length && <div>No volume mounts specified</div> }
          {
            mounts.map((mount, index) => (
              <div key={ index }>
                <FeedbackInput type='text'
                               prompt='volume name'
                               value={ mount.volume } />
                <FeedbackInput type='text'
                               prompt='mount path'
                               value={ mount.path } />
                <button onClick={
                  event => {
                    event.preventDefault()
                    mounts.removeField(index)
                  }
                }>
                  Remove this mount
                </button>
              </div>
            ))
          }
        </div>
        <div>
          Expose ports
          <button onClick={
            event => {
              event.preventDefault()
              ports.addField()
            }
          }>
            Add a port
          </button>
          { !ports.length && <div>No ports exposed</div> }
          {
            ports.map((port, index) => (
              <div key={ index }>
                <FeedbackInput type='number'
                               prompt='port number'
                               value={ port.number } />
                <FeedbackInput type='text'
                               prompt='port protocol'
                               value={ port.protocol } />
                <label>
                  <FeedbackInput type='checkbox'
                                 prompt=''
                                 value={ port.public } />
                  Public?
                </label>
                <button onClick={
                  event => {
                    event.preventDefault()
                    ports.removeField(index)
                  }
                }>
                  Remove this port
                </button>
              </div>
            ))
          }
        </div>

        <button type='submit'>
          Create container
        </button>

      </form>
    )
  }
}
