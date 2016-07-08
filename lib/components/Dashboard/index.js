import React from 'react'
import Layout from 'components/Layout'
import FadeUpChange from 'components/FadeUpChange'
import SlideChange from 'components/SlideChange'
import Breadcrumb from 'components/Breadcrumb'

export default class Dashboard extends React.Component {
  render() {
    const {
      constellation,
      content,
      footer,
      header,
      tray,
      trayMenu,
    } = this.props

    return(
      <Layout>
        { header }
        <Breadcrumb { ...(this.props) }/>
        <FadeUpChange transitionAppear={ true } transitionLeave={ false }>
          { content && React.cloneElement(content, { key: location.pathname }) }
        </FadeUpChange>
        { footer }
        { tray && <Tray menu={ trayMenu }>{ tray }</Tray> }
        <SlideChange transitionAppear={ true }>
          {
            constellation &&
              React.cloneElement(constellation, { key: location.pathname })
          }
        </SlideChange>
      </Layout>
    )
  }
}
