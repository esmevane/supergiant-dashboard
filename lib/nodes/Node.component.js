import React from 'react'
import Row from '../elements/Row.component'
import Column from '../elements/Column.component'
import Resource from '../elements/Resource.component'
import TextNote from '../elements/TextNote.component'
import CpuMeter from '../elements/CpuMeter.component'
import RamMeter from '../elements/RamMeter.component'

const styles = node => ({ opacity: (node.get('status') === 'READY') ? 1 : 0.5 })

const Node = ({ node }) =>
  <Resource style={ styles(node) } >
    <header>
      <h4>{ node.get('class') }</h4>
      <TextNote>
        ({ node.get('name') })
      </TextNote>
      {
        node.get('status') === 'NOT_READY' && (
          <Column size={ 12 }>Node not active</Column>
        )
      }
    </header>

    <TextNote>
      <a href={ node.get('external_ip') } target='_blank'>
        Node address { node.get('external_ip') }
      </a>
    </TextNote>

    <Row>
      <CpuMeter usage={ node.getIn(['cpu', 'usage']) }
                limit={ node.getIn(['cpu', 'limit']) } />
    </Row>

    <Row>
      <RamMeter usage={ node.getIn(['ram', 'usage']) }
                limit={ node.getIn(['ram', 'limit']) } />
    </Row>
  </Resource>

Node.propTypes = { node: React.PropTypes.object.isRequired }

export default Node
