import React from 'react'
import SelectMinMax from '../shared/SelectMinMax.component'
import FeedbackInput from '../shared/FeedbackInput.component'
import { OrbitingSatellite } from '../visuals/orbitingSatellite'

export default class ContainerForm extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      image: React.PropTypes.object.isRequired,
      cpu: React.PropTypes.object.isRequired,
      ram: React.PropTypes.object.isRequired,
      mounts: React.PropTypes.array.isRequired,
      ports: React.PropTypes.array.isRequired,
      env: React.PropTypes.array.isRequired
    }).isRequired
  }

<<<<<<< b464dfd820db2d51cbd5c2276701aaa4f384d98a:lib/containers/CreateContainer.component.js
  componentDidMount() { orbitingSatellite && orbitingSatellite.start() }
  componentWillUnmount() { orbitingSatellite && orbitingSatellite.stop() }
=======
  constructor(props) {
    super(props)
    // this.planetColor = props.component.get('color')
    this.planetColor = '#ff0000'
    this.backgroundCanvas = new OrbitingSatellite(this.planetColor)
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }
>>>>>>> Debug missing class instance in ExpandedContainerForm:lib/containers/ExpandedContainerForm.component.js

  render() {
    const { image, cpu, ram, mounts, ports, env } = this.props.fields
    const { submit } = this.props

    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create a New Container</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>
          <div className='container-create-form'>


            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <fieldset className='col-4'>
                <label className="easy">Docker Image</label>
                <FeedbackInput autoFocus='true' type='text' prompt='select an image' value={ image } />
              </fieldset>
            </div>

            <br /><br />

            <div className='table-row'>
              <aside className='col-2'>
                <p className='text-note'>
                  Select the resources you want this Container to use
                  during high and low load times.
                </p>
                <p className='text-note'>
                  Supergiant will automatically scale within this range, and
                  the Packing Algorithm will automatically maxise use of
                  available hardware.
                </p>
              </aside>

              <fieldset className='col-4'>
                <label className="easy">CPU</label>
                <SelectMinMax { ...cpu } />

                <label className="easy">RAM</label>
                <SelectMinMax { ...ram } />
              </fieldset>
            </div>

            <br /><br />

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <fieldset className='materials-card col-6'>
                <label className='easy'>Environment Variables</label>

                { !!env.length && <div className='table-row'><div className='col-4'>Name</div><div className='col-5'>Value</div></div> }

                {
                  env.map((variable, index) => (
                    <div key={ index } className='table-row'>
                      <div className='col-4'>
                        <FeedbackInput type='text'
                                       prompt='variable name'
                                       autoFocus='true'
                                       value={ variable.name } />
                      </div>
                      <div className='col-5'>
                        <FeedbackInput type='text'
                                       prompt='variable value'
                                       value={ variable.value } />
                      </div>
                      <div className='col-2'>
                        <button className='glyph-x small' onClick={
                          event => {
                            event.preventDefault()
                            env.removeField(index)
                          }
                        }>Remove</button>
                      </div>
                    </div>
                  ))
                }

                <div>
                  <button className='glyph-plus small' onClick={
                    event => {
                      event.preventDefault()
                      env.addField()
                    }
                  }>Add</button>
                </div>
              </fieldset>
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <fieldset className='materials-card col-6'>
                <label className='easy'>Volume mount points</label>

                { !!mounts.length && <div className='table-row'><div className='col-4'>Volume name</div><div className='col-5'>Mount path</div></div> }

                {
                  mounts.map((mount, index) => (
                    <div key={ index } className='table-row'>
                      <div className='col-4'>
                        <FeedbackInput type='text'
                                       prompt='volume name'
                                       autoFocus='true'
                                       value={ mount.volume } />
                      </div>
                      <div className='col-5'>
                        <FeedbackInput type='text'
                                       prompt='mount path'
                                       value={ mount.path } />
                      </div>
                      <div className='col-2'>
                        <button className='glyph-x small' onClick={
                          event => {
                            event.preventDefault()
                            mounts.removeField(index)
                          }
                        }>Remove</button>
                      </div>
                    </div>
                  ))
                }

                <div>
                  <button className='glyph-plus small' onClick={
                    event => {
                      event.preventDefault()
                      mounts.addField()
                    }
                  }>Add</button>
                </div>
              </fieldset>
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <fieldset className='materials-card col-6'>
                <label className='easy'>Expose ports</label>

                { !!ports.length && <div className='table-row'><div className='col-4'>Port number</div><div className='col-5'>Protocol</div></div> }

                {
                  ports.map((port, index) => (
                    <div key={ index } className='table-row'>
                      <div className='col-3'>
                        <FeedbackInput type='number'
                                       prompt='port number'
                                       autoFocus='true'
                                       value={ port.number } />
                      </div>
                      <div className='col-3'>
                        <FeedbackInput type='text'
                                       prompt='port protocol'
                                       value={ port.protocol } />
                      </div>
                      <div className='col-3'>
                        <label>
                          <FeedbackInput type='checkbox'
                                         prompt=''
                                         value={ port.public } />
                          &nbsp;&nbsp;Public?
                        </label>
                      </div>
                      <div className='col-2'>
                        <button className='glyph-x small' onClick={
                          event => {
                            event.preventDefault()
                            ports.removeField(index)
                          }
                        }>Remove</button>
                      </div>
                    </div>
                  ))
                }

                <div>
                  <button className='glyph-plus small' onClick={
                    event => {
                      event.preventDefault()
                      ports.addField()
                    }
                  }>Add</button>
                </div>
              </fieldset>
            </div>

            <div className='table-row'>
              <aside className='col-2'>&nbsp;</aside>

              <div className='col-4'>
                <button className='glyph-right-arrow' type='submit'>
                  Create container
                </button>
              </div>
            </div>
          </div>

        </form>
      </section>
    )
  }
}
