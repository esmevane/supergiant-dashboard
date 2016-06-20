import React from 'react'
import Layout from 'components/Layout'
import FadeUpChange from 'components/FadeUpChange'
import SlideChange from 'components/SlideChange'
import Breadcrumb from 'components/Breadcrumb'
import Assets from 'containers/Assets'

export default class Dashboard extends React.Component {
  render() {
    const { header, footer, content, constellation } = this.props

    return(
      <Layout>
        { header }
        <Breadcrumb { ...(this.props) }/>
        <FadeUpChange transitionAppear={ true } transitionLeave={ false }>
          { content && React.cloneElement(content, { key: location.pathname }) }
        </FadeUpChange>
        <Assets />
        { footer }
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
