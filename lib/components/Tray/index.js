import React from 'react'
import FlipChange from 'components/FlipChange'
import styles from './styles.module.css'

export default class Tray extends React.Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { children, menu } = this.props

    const container = open ? styles.containerOpen : styles.containerClosed
    const content = open ? styles.contentVisible : styles.contentHidden
    const menu = open ? styles.menuVisible : styles.menuHidden
    const controls = open ? styles.controlsOpen : styles.controlsClosed

    return(
      <div className={ container }>
        <div className={ controls }>
          <FlipChange transitionLeave={ false } transitionAppear={ true }>
            {
              open && (
                <span key='close' onClick={ this.close }>
                  Close
                  <i className='fa fa-times fa-fw' />
                </span>
              )
            }
            {
              !open && (
                <span key='open' onClick={ this.open }>
                  Open
                  <i className='fa fa-long-arrow-up fa-fw' />
                </span>
              )
            }
          </FlipChange>
        </div>
        <div className={ content }>
          { children }
        </div>
        <div className={ menu }>
          { menu }
        </div>
      </div>
    )
  }
}
