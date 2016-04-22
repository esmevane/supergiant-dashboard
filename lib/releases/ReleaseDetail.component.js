import React from 'react'
import { fromJS } from 'immutable'


const ReleaseOverview = ({ release }) =>
  <div className='table-row'
       id={ anchorSafeString([ 'release', release.get('timestamp') ]) }>
    <div className='row thin'>
      <h3 className='col-6'>Release Overview</h3>
    </div>

    <table className='line-items'>
      <thead>
        <tr>
          <th>Instance count</th>
          <th>Containers</th>
          <th>Volumes</th>
          <th>Termination grace period</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ release.get('instance_count') }</td>
          <td>{ release.get('containers').count() }</td>
          <td>{ release.get('volumes').count() }</td>
          <td>{ release.get('termination_grace_period') }</td>
        </tr>
      </tbody>
    </table>
  </div>

const ReleaseVariable = ({ variable }) =>
  <tr>
    <td>{ variable.get('name') }</td>
    <td>{ variable.get('value') }</td>
  </tr>

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

const ReleaseMount = ({ mount }) =>
  <tr>
    <td>{ mount.get('volume') }</td>
    <td>{ mount.get('path') }</td>
  </tr>

const ReleaseMounts = ({ mounts = fromJS([]) }) =>
  <div>
    <h5>Mounts</h5>
    {
      mounts.count() == 0 && (
        <p className='text-note'>No volumes defined.</p>
      )
    }
    {
      mounts.count() > 0 && (
        <table>
          <thead>
            <tr>
              <th>Volume name</th>
              <th>Mounted on</th>
            </tr>
          </thead>
          <tbody>
          {
            mounts.map((mount, index) => (
              <ReleaseMount mount={ mount } key={ index } />
            ))
          }
          </tbody>
        </table>
      )
    }
  </div>

const ReleasePort = ({ port }) =>
  <tr>
    <td>{ port.get('protocol') }</td>
    <td>{ port.get('public') }</td>
    <td>{ port.get('external_number') }</td>
    <td>{ port.get('number') }</td>
    <td>{ port.get('entrypoint_domain') }</td>
  </tr>

const ReleasePorts = ({ ports }) =>
  <div>
    <h5>Ports</h5>
    { ports.count() === 0 && (<p className='text-note'>No ports defined.</p>) }
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

const ReleaseHardware = ({ cpu, ram }) =>
  <table className='line-items'>
    <thead>
    <tr>
      <th>CPU Min</th>
      <th>CPU Max</th>
      <th>RAM Min</th>
      <th>RAM Max</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{ cpu.get('min') }</td>
      <td>{ cpu.get('max') }</td>
      <td>{ ram.get('min') }</td>
      <td>{ ram.get('max') }</td>
    </tr>
    </tbody>
  </table>

const ReleaseContainer = ({ container, release }) =>
  <div id={ anchorSafeString([ release.get('timestamp'), container.get('image') ]) }>
    <h4 className='with-icon icon-city'>{ container.get('image') }</h4>
    <ReleaseHardware cpu={ container.get('cpu') } ram={ container.get('ram')} />
    <ReleaseVariables env={ container.get('env') } />
    <ReleaseMounts mounts={ container.get('mounts') } />
    <ReleasePorts ports={ container.get('ports') } />
  </div>

const ReleaseContainers = ({ containers, release }) =>
  <div className='release-detail-pane collapsible'>
    <h3 className='col-6'>Containers</h3>
    {
      containers.count() !== 0 && (
        <div>
          {
            containers.map((container, index) => (
              <ReleaseContainer container={ container } key={ index } release={ release } />
            ))
          }
        </div>
      )
    }
  </div>

const ReleaseVolume = ({ volume }) =>
  <tr>
    <td>{ volume.get('name') }</td>
    <td>{ volume.get('size') }</td>
    <td>{ volume.get('type') }</td>
  </tr>


const ReleaseVolumes = ({ volumes }) =>
  <div className='release-detail-pane collapsible'>
    <h3 className='col-6'>Volumes</h3>
    { volumes.count() === 0 && (<p className='text-note'>No volumes defined.</p>) }
    {
      volumes.count() !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Volume name</th>
              <th>Size</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              volumes.map((volume, index) => (
                <ReleaseVolume volume={ volume } key={ index } />
              ))
            }
          </tbody>
        </table>
      )
    }
  </div>


function anchorSafeString(parts=[]) {
  let output = parts.map(function(p) {
    return p.replace(/[^a-z0-9\w\s\-]/gi,'-')
  })

  return output.join('-')
}


const ReleaseOverviewMenu = ({ release }) =>
  <a className='with-icon icon-deploy'
     href={ `#${ anchorSafeString([ 'release', release.get('timestamp') ]) }` }>
    Release Overview
  </a>


const ReleaseContainersMenu = ({ containers, release }) =>
  <div>
    <h3 className='with-icon icon-city'>Containers</h3>
    {
      containers.count() < 1 && (
        <p className='text-note'>No containers defined.</p>
      )
    }

    {
      containers.count() >= 1 && (
        <div>
          {
            containers.map((container, index) => (
              <a href={ `#${ anchorSafeString([ release.get('timestamp'), container.get('image') ]) }` }>
                { container.get('image') }
              </a>
            ))
          }
        </div>
      )
    }
  </div>


const ReleaseVolumesMenu = ({ volumes, release }) =>
  <div>
    <h3 className='with-icon icon-satellite'>Volumes</h3>
    {
      volumes.count() < 1 && (
      <p className='text-note'>No volumes defined.</p>
      )
    }

    {
      volumes.count() >= 1 && (
        <div>
          {
            volumes.map((vol, index) => (
              <a href={ `#${ anchorSafeString([ release.get('timestamp'), vol.get('id') ]) }` }>
                { vol.get('name') }
              </a>
            ))
          }
        </div>
      )
    }
  </div>


const ReleaseDetail = ({ release }) =>
  <div className='release-detail'>
    <div className='release-detail-show'>
      <ReleaseOverview release={ release }/>
      <ReleaseContainers containers={ release.get('containers') }
                         release={ release }/>
      <ReleaseVolumes volumes={ release.get('volumes') } />
    </div>
  </div>

ReleaseDetail.propTypes = {
  release: React.PropTypes.object.isRequired
}

export default ReleaseDetail
