import React from 'react'
import { fromJS } from 'immutable'

const InstanceCount = ({ release }) =>
  <span>
    <dt>Instance count</dt>
    <dd>{ release.get('instance_count') }</dd>
  </span>

const TerminationGracePeriod = ({ release }) =>
  <span>
    <dt>Termination grace period</dt>
    <dd>{ release.get('termination_grace_period') }</dd>
  </span>

const ReleaseMinMax = ({ min, max }) => <dd>Min: { min } / Max: { max }</dd>

const ReleaseVariable = ({ variable }) =>
  <dl>
    <dt>Name</dt>
    <dd>{ variable.get('name') }</dd>
    <dt>Value</dt>
    <dd>{ variable.get('value') }</dd>
  </dl>

const ReleaseVariables = ({ env }) =>
  <span>
    <dt>Environment variables</dt>
    <dd>
      { env.count() === 0 && (<span>No environment variables set.</span>) }
      {
        env.map((variable, index) => (
          <ReleaseVariable variable={ variable } key={ index } />
        ))
      }
    </dd>
  </span>

const ReleaseMount = ({ mount }) =>
  <dl>
    <dt>Volume name</dt>
    <dd>{ mount.get('volume') }</dd>
    <dt>Mounted on</dt>
    <dd>{ mount.get('path') }</dd>
  </dl>

const ReleaseMounts = ({ mounts = fromJS([]) }) =>
  <span>
    <dt>Volume mount definitions</dt>
    <dd>
      { mounts.count() === 0 && (<span>No volume mounts defined.</span>) }
      {
        mounts.map((mount, index) => (
          <ReleaseMount mount={ mount } key={ index } />
        ))
      }
    </dd>
  </span>

const ReleasePort = ({ port }) =>
  <dl>
    <dt>Protocol</dt>
    <dd>{ port.get('protocol') }</dd>
    <dt>Public?</dt>
    <dd>{ port.get('public') }</dd>
    <dt>External port number</dt>
    <dd>{ port.get('external_number') }</dd>
    <dt>Internal port number</dt>
    <dd>{ port.get('number') }</dd>
    <dt>Exposed on domain</dt>
    <dd>{ port.get('entrypoint_domain') }</dd>
  </dl>

const ReleasePorts = ({ ports }) =>
  <span>
    <dt>Exposed ports</dt>
    <dd>
      { ports.count() === 0 && (<span>No ports defined.</span>) }
      {
        ports.map((port, index) => <ReleasePort port={ port } key={ index } />)
      }
    </dd>
  </span>

const ReleaseCpu = ({ cpu }) =>
  <span>
    <dt>CPU</dt>
    <ReleaseMinMax min={ cpu.get('min') } max={ cpu.get('max') } />
  </span>

const ReleaseRam = ({ ram }) =>
  <span>
    <dt>RAM</dt>
    <ReleaseMinMax min={ ram.get('min') } max={ ram.get('max') } />
  </span>

const ReleaseContainer = ({ container }) =>
  <dl>
    <dt>Image</dt>
    <dd>{ container.get('image') }</dd>
    <ReleaseCpu cpu={ container.get('cpu') } />
    <ReleaseRam ram={ container.get('ram') } />
    <ReleaseVariables env={ container.get('env') } />
    <ReleaseMounts mounts={ container.get('mounts') } />
    <ReleasePorts ports={ container.get('ports') } />
  </dl>

const ReleaseContainers = ({ containers }) =>
  <span>
    <dt>Containers: { containers.count() }</dt>
    { containers.count() === 0 && (<dd>No containers defined.</dd>) }
    {
      containers.count() !== 0 && (
        <dd>
          {
            containers.map((container, index) => (
              <ReleaseContainer container={ container } key={ index } />
            ))
          }
        </dd>
      )
    }
  </span>

const ReleaseVolume = ({ volume }) =>
  <dl>
    <dt>Volume name</dt>
    <dd>{ volume.get('name') }</dd>
    <dt>Size</dt>
    <dd>{ volume.get('size') }</dd>
    <dt>Type</dt>
    <dd>{ volume.get('type') }</dd>
  </dl>

const ReleaseVolumes = ({ volumes }) =>
  <span>
    <dt>Volumes: { volumes.count() }</dt>
    { volumes.count() === 0 && (<dd>No volumes defined.</dd>) }
    {
      volumes.count() !== 0 && (
        <dd>
          {
            volumes.map((volume, index) => (
              <ReleaseVolume volume={ volume } key={ index } />
            ))
          }
        </dd>
      )
    }
  </span>

const ReleaseDetail = ({ release }) =>
  <dl>
    <InstanceCount release={ release } />
    <TerminationGracePeriod release={ release } />
    <ReleaseContainers containers={ release.get('containers') } />
    <ReleaseVolumes volumes={ release.get('volumes') } />
  </dl>

ReleaseDetail.propTypes = { release: React.PropTypes.object.isRequired }

export default ReleaseDetail
