import React from 'react'
import App from './App.container'
import AppDashboard from './AppDashboard.component'
import AppDashboardContents from './AppDashboardContents.component'
import AppWelcome from './AppWelcome.component'
import ContextHeader from '../elements/ContextHeader.component'
import ContextTitle from '../elements/ContextTitle.component'
import ContextMenu from '../elements/ContextMenu.component'
import ActionButton from '../elements/ActionButton.component'
import FadeChange from '../shared/FadeChange.animation'

export default class Apps extends React.Component {
  static propTypes = {
    apps: React.PropTypes.object.isRequired,
    addApp: React.PropTypes.func.isRequired,
    invalidateCache: React.PropTypes.func.isRequired
  }

  componentWillMount() { this.props.invalidateCache() }

  render() {
    const { apps, addApp } = this.props
    const onlyOneApp = apps.count() === 1
    const noApps = apps.count() === 0
    const hasDashboard = apps.getIn([0, 'name']) === 'supergiant'
    const isDefaultInstall = (onlyOneApp && hasDashboard) || noApps

    return(
      <AppDashboard>
        <ContextHeader>
          <ContextTitle>My Apps</ContextTitle>

          <ContextMenu>
            <ActionButton onClick={ addApp } isAction={ true }>
              New App
            </ActionButton>
          </ContextMenu>
        </ContextHeader>

        <AppDashboardContents>
          <FadeChange>
            { apps.map((app, index) => <App key={ index } app={ app } />) }
            { isDefaultInstall && (<AppWelcome addApp={ addApp } />) }
          </FadeChange>
        </AppDashboardContents>
      </AppDashboard>
    )
  }
}
