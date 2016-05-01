import React from 'react'
import ActionButton from '../elements/ActionButton.component'
import Column from '../elements/Column.component'
import ContextData from '../elements/ContextData.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextMenu from '../elements/ContextMenu.component'
import ContextTitle from '../elements/ContextTitle.component'
import EscapeButton from '../elements/EscapeButton.component'
import Row from '../elements/Row.component'
import StatusMeter from '../elements/StatusMeter.component'
import TextNote from '../elements/TextNote.component'

export default class InstanceDetail extends React.Component {
  render() {
    return(
      <section>
        <ContextHeader>
          <ContextTitle>
            <EscapeButton onClick={ e => e.preventDefault() } />
            provisioner-rails.img Instance
          </ContextTitle>
          <ContextMenu>
            <ActionButton onClick={() => {}} isAction={ true }>
              Open terminal
            </ActionButton>
            <ActionButton onClick={() => {}} isAction={ true }>
              View logs
            </ActionButton>
          </ContextMenu>
        </ContextHeader>

        <Row>
          <Column className='component-instance-overview' size={ 4 }>
            <h4>Resources Limits</h4>

            <Row className='component-resource-setting'>
              <StatusMeter percentage='37.5%' />
              <Column className='text-left' size={ 6 }>
                <h4>6 cores</h4>
                <TextNote>Min CPU</TextNote>
              </Column>
              <Column className='text-right' size={ 6 }>
                <h4>16 cores</h4>
                <TextNote>Max CPU</TextNote>
              </Column>
            </Row>

            <Row className='component-resource-setting'>
              <StatusMeter percentage='45%' />
              <Column className='text-left' size={ 6 }>
                <h4>12GB</h4>
                <TextNote>Min RAM</TextNote>
              </Column>
              <Column className='text-right' size={ 6 }>
                <h4>32GB</h4>
                <TextNote>Max RAM</TextNote>
              </Column>
            </Row>
          </Column>

          <Column className='component-instance-settings' size={ 8 }>

            <ContextData>
              <header>
                <h3>Ports</h3>
                <ContextMenu>
                  <ActionButton isAction={ true } onClick={ () => {} }>
                    New
                  </ActionButton>
                </ContextMenu>
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
            </ContextData>

            <ContextData>
              <header>
                <h3>Environment Variables</h3>
                <ContextMenu>
                  <ActionButton isAction={ true } onClick={ () => {} }>
                    New
                  </ActionButton>
                </ContextMenu>
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
            </ContextData>
          </Column>
        </Row>
      </section>
    )
  }
}
