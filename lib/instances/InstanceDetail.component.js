import React from 'react'

export default class InstanceDetail extends React.Component {
  render() {
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>
            <button className='esc' onClick={ e => e.preventDefault() } />
            provisioner-rails.img Instance
          </div>
          <div className='context-menu'>
            <button className='with-glyph glyph-right-arrow-action-color'>Open Terminal</button>
            <button className='with-glyph glyph-right-arrow-action-color'>View Logs</button>
          </div>
        </header>

        <div className='row'>
          <div className='component-instance-overview col-4'>
            <h4>Resources Limits</h4>

            <div className='component-resource-setting row'>
              <div className='status-meter'>
                <div className='status-metric' style={{ width: '37.5%' }} />
              </div>
              <div className='col-6 text-left'>
                <h4>6 cores</h4>
                <p className='text-note'>Min CPU</p>
              </div>
              <div className='col-6 text-right'>
                <h4>16 cores</h4>
                <p className='text-note'>Max CPU</p>
              </div>
            </div>

            <div className='component-resource-setting row'>
              <div className='status-meter'>
                <div className='status-metric' style={{ width: '45%' }} />
              </div>
              <div className='col-6 text-left'>
                <h4>12GB</h4>
                <p className='text-note'>Min RAM</p>
              </div>
              <div className='col-6 text-right'>
                <h4>32GB</h4>
                <p className='text-note'>Max RAM</p>
              </div>
            </div>
          </div>

          <div className='component-instance-settings col-8'>

            <section className='context-data'>
              <header>
                <h3>Ports</h3>
                <menu className='context-menu'>
                  <button className='with-glyph glyph-right-arrow-action-color'>New</button>
                </menu>
              </header>

              <table className='line-items'>
                <thead>
                  <tr>
                    <th>Protocol</th>
                    <th>Number</th>
                    <th>User/Password</th>
                    <th>Public</th>
                    <th>Whitelist IPs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href='#'>HTTP</a></td>
                    <td><a href='#'>9200</a></td>
                    <td><a href='#'>show</a></td>
                    <td><a href='#'>Yes</a></td>
                    <td><a href='#'>none</a></td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className='context-data'>
              <header>
                <h3>Environment Variables</h3>
                <menu className='context-menu'>
                  <button className='with-glyph glyph-right-arrow-action-color'>New</button>
                </menu>
              </header>

              <table className='line-items'>
                <tbody>
                  <tr>
                    <td><a href='#'>CLUSTER_ID</a></td>
                    <td className='text-right'><a href='#'>sg_test</a></td>
                  </tr>
                  <tr>
                    <td><a href='#'>INDEX_NUMBER_OF_SHARDS</a></td>
                    <td className='text-right'><a href='#'>4</a></td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </section>
    )
  }
}
