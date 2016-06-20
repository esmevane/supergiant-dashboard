import React from 'react'
import { connect } from 'react-redux'
import * as crud from 'lib/crud-utilities'
import NodesList from 'components/NodesList'
import styles from './styles.module.css'

const { fetch } = crud.createCrudActions('nodes')

class Node extends React.Component {
  static fetchData = () => fetch()

  render() {
    const { nodes, requesting, refresh } = this.props
    const opacity = !requesting ? 1.0 : 0.5
    const iconClass = `fa fa-refresh fa-2x ${!requesting ? '' : 'fa-spin'}`

    return(
      <div className={ styles.container }>
        <div className={ styles.controls }>
          <button className={ styles.button }
                  disabled={ requesting }
                  onClick={ refresh }>
            <i className={ iconClass } title="Refresh nodes" />
          </button>
        </div>
        <div className={ styles.content } style={ { opacity } }>
          <NodesList nodes={ nodes } />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const nodes = crud.getRecords(state.get('nodes'))
  const requesting = crud.isRequesting(state.get('nodes'))

  return { requesting, nodes }
}

function mapDispatchToProps(dispatch, props) {
  const refresh = event => {
    event.preventDefault()

    dispatch(fetch())
  }

  return { refresh }
}

export default connect(mapStateToProps, mapDispatchToProps)(Node)
