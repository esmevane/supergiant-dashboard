import React from 'react'
import Containers from '../containers/Containers.container'
import Volumes from '../volumes/Volumes.container'
import { BackgroundPlanet } from '../visuals/backgroundPlanet'


export default class ShowComponent extends React.Component {
  constructor(props) {
    super(props)
    this.planetColor = props.component.get('color')
    this.backgroundCanvas = new BackgroundPlanet(this.planetColor)
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { app, component, handleDeploy, handleDestroy } = this.props
    const { fauxState } = this.props
    const destroy = handleDestroy(app, component)
    const deploy = handleDeploy(app, component, fauxState)

    return(
      <div className='component'>
        <header className='context-header'>
          <div className='context-title'>Name of Component</div>

          <div className='context-menu'>
            <div className='context-status'>
              3 undeployed changes.
            </div>

            <button className='glyph-right-arrow' onClick={ deploy }>
              Deploy
            </button>

            <button className='with-glyph glyph-x' onClick={ destroy }>
              Destroy
            </button>

            <button className='with-glyph glyph-right-arrow'>
              Restart
            </button>
          </div>
        </header>

        <div className='context-overview'>
          <div className='detail'>
            <h3>0 instances</h3>
            <p className='text-note'>0 running</p>
            <p>
              <a href='#' onClick={e=>e.preventDefault()}>
                edit instances
              </a>
            </p>
          </div>

          <div className='detail'>
            <h3>Mar 13th, 2016</h3>
            <p className='text-note'>Latest release</p>
            <p>
              <a href='#' onClick={
                () => {
                  let href = window.location.href
                  let uri = `${href.replace(/\/$/, '')}/releases`
                  window.location = uri
                }
              }>
                view past releases
              </a>
            </p>
          </div>

          <div className='status'>
            <div className='status-meter'>
              <div className='status-metric' style={{ width: '50%' }} />
            </div>
            <div className='status-meter'>
              <div className='status-metric warn' style={{ width: '80%' }} />
            </div>
            <div className='status-meter'>
              <div className='status-metric alert' style={{ width: '92%' }} />
            </div>
            <h3>123/456</h3>
            <p className='text-note'>Node health</p>
          </div>

          <div className='summary'>
            <div className='notice alert'>
              <h3>This component is not running.</h3>
              <p>This component needs at least 1 instance to run.</p>
            </div>
          </div>
        </div>

        <div className='component-detail-resources'>
          <Containers component={ component } app={ app } />
          <Volumes component={ component } app={ app } />
        </div>

        <div className='context-system-resources' style={{ backgroundColor: this.planetColor }}>
          <header>
            <h3>Nodes</h3>
            <menu className='context-tabs'>
              <button className='active'>All</button>
              <button>Instance 1</button>
              <button>Instance 2</button>
              <button>Instance 3</button>
            </menu>
          </header>

          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((node, index) => (
              <div className='resource' key={ index }>
                <h5>123.456.78.90</h5>

                <div className='status-meter with-label-right'>
                  <div className='status-metric' style={{ width: '50%' }} />
                </div>
                <div className='label-right'>CPU</div>

                <div className='status-meter with-label-right'>
                  <div className='status-metric warn'
                       style={{ width: '80%' }} />
                </div>
                <div className='label-right'>RAM</div>

                <div className='status-meter with-label-right'>
                  <div className='status-metric alert'
                       style={{ width: '92%' }} />
                </div>
                <div className='label-right'>Disk</div>
              </div>
            ))
          }

        </div>
      </div>
    )
  }
}

export default ShowComponent
