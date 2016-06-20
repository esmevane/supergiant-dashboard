import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { connect } from 'react-redux'
import FlipChange from 'components/FlipChange'
import styles from './styles.module.css'

class Assets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      records: {}
    }
  }

  toggle = () => this.setState({ open: !this.state.open })
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const container = open ? styles.containerOpen : styles.containerClosed
    const content = open ? styles.contentVisible : styles.contentHidden
    const menu = open ? styles.menuVisible : styles.menuHidden
    const controls = open ? styles.controlsOpen : styles.controlsClosed
    const recordTypes = [
      `Variables`,
      `Ports`,
      `Mounts`,
      `Containers`,
      `Volumes`,
      `Commands`
    ]

    const records = {}

    return(
      <div className={ container }>
        <div className={ controls }>
          <FlipChange transitionLeave={ false } transitionAppear={ true }>
            {
              open && (
                <span key='close' onClick={ this.close }>
                  Close assets
                  <i className='fa fa-times fa-fw' />
                </span>
              )
            }
            {
              !open && (
                <span key='open' onClick={ this.open }>
                  Edit assets
                  <i className='fa fa-long-arrow-up fa-fw' />
                </span>
              )
            }
          </FlipChange>
        </div>
        <div className={ content }>
          {
            recordTypes.map((type, index) => (
              <div key={ index } className={ styles.records }>
                <div className={ styles.title }>
                  { type }
                </div>
                {
                  records[kebabCase(type)] &&
                    records[kebabCase(type)].map((record, index) => (
                      <div key={ index } className={ styles.record }>
                        { JSON.stringify(record) }
                      </div>
                    ))
                }
              </div>
            ))
          }
        </div>
        <div className={ menu }>
          <span key='actions' className={ styles.actions }>
            <button className={ styles.button }>
              <i className='fa fa-plus' />
              Variable
            </button>
            <button className={ styles.button }>
              <i className='fa fa-plus' />
              Port
            </button>
            <button className={ styles.button }>
              <i className='fa fa-plus' />
              Mount
            </button>
            <button className={ styles.button }>
              <i className='fa fa-plus' />
              Container
            </button>
            <button className={ styles.button }>
              <i className='fa fa-plus' />
              Volume
            </button>
            <button className={ styles.button }>
              <i className='fa fa-plus' />
              Command
            </button>
          </span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
