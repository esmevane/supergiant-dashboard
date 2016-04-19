import React from 'react'
import { Link } from 'react-router'
import Containers from '../containers/Containers.container'
import Volumes from '../volumes/Volumes.container'
import NotFound from '../shared/NotFound.component'
import { BackgroundPlanet } from '../visuals/backgroundPlanet'

export default class ComponentDetail extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    handleDestroy: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { color: '#ff0000' }
  }

  componentWillMount() {
    this.props.fetchResources()

    if (this.props.component) {
      this.setState({ color: this.props.component.get('color') })
    }

    this.backgroundCanvas = new BackgroundPlanet(this.state.color)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.component !== newProps.component) {
      let color = newProps.component.get('color')
      this.setState({ color })

      this.backgroundCanvas.stop()
      this.backgroundCanvas = new BackgroundPlanet(color)
      this.backgroundCanvas.start()
    }
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  resourcesFound() {
    const { app, component, handleDeploy, handleDestroy } = this.props
    const destroy = handleDestroy(app, component)
    const appRoot = `/apps/${app.get('name')}`
    const componentRoot = `/components/${component.get('name')}`

    return(
      <div className='component'>
        <header className='context-header'>
          <div className='context-title'>Name of Component</div>

          <div className='context-menu'>
            <div className='context-status'>
              3 undeployed <a href='#'>changes</a>.
            </div>

            <button className='with-glyph glyph-binary-action-color'>
              Restart
            </button>

            <button className='with-glyph glyph-x-action-color' onClick={ destroy }>
            Destroy
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
              <Link to={ `${appRoot}${componentRoot}/releases` }>
                view past releases
              </Link>
            </p>
          </div>

          <div className='status'>
          </div>

          <div className='summary'>
            <div className='notice alert'>
              <h3>This component is not running.</h3>
              <p>This component needs at least 1 instance to run.</p>
            </div>
            <div className='notice warn'>
              <h3>This component is warning you.</h3>
              <p>Something is about to happen.</p>
            </div>
            <div className='notice'>
              <h3>This component has a default notice.</h3>
              <p>We're all fine here now, thank you. How are you? </p>
            </div>
            <div className='notice success'>
              <h3>This component is running.</h3>
            </div>
          </div>
        </div>

        <div className='component-detail-resources'>
          <Containers component={ component } app={ app } />
          <Volumes component={ component } app={ app } />
        </div>

        <div className='context-system-resources'>
          <header>
            <h2>Instances</h2>
          </header>

          <ul className='resources-list'>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((node, index) => (
                <li className='resource' key={ index }>
                  <h4>Instance { index + 1 }</h4>

                  <div className='row'>
                    <div className='status-meter with-label-right'>
                      <div className='status-metric'
                           style={{ width: '50%' }}>2.2</div>
                    </div>
                    <div className='label-right'>CPU</div>
                  </div>

                  <div className='row'>
                    <div className='status-meter with-label-right'>
                      <div className='status-metric warn'
                           style={{ width: '80%' }}>31.2 GB</div>
                    </div>
                    <div className='label-right'>RAM</div>
                  </div>


                  <div className='row'>
                    <div className='icon icon-disk col-2' />
                    <p className='col-8'>
                      db-foo<br />
                      <span className='text-faded'>GP2 drive</span>
                    </p>
                  </div>

                  <div className='row'>
                    <div className='status-meter with-label-right'>
                      <div className='status-metric alert'
                           style={{ width: '92%' }}>128.5 GB</div>
                    </div>
                    <div className='label-right'>Disk</div>
                  </div>
                </li>
              ))
            }
          </ul>

        </div>
      </div>
    )
  }

  render() {
    const { app, component } = this.props

    return app && component ? this.resourcesFound() : <NotFound />
  }
}
