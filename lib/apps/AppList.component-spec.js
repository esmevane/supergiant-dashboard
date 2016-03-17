import Immutable from 'immutable'
import { create } from '../shared/entities.behavior'
import { Link } from 'react-router'
import AppList from './AppList.component'

describe("AppList.component", () => {
  let apps = Immutable.fromJS([create({ name: "Test app" })])
  let renderer = createRenderer()
  let appItems = apps.map(app => <div key={app}>{ app.get('name' ) }</div>)
  let onNew = () => ({})

  renderer.render(<AppList onNew={ onNew }>{ appItems }</AppList>)

  let component = renderer.getRenderOutput()

  it("layout", () => {
    expect(component.type).to.eql('section')
    expect(component.props.className).to.eql('apps-list')

    expect(component.props.children).to.eql([
      <h2>Your apps</h2>,
      <button ref='button' onClick={ onNew }>Create an app</button>,
      <div className='apps-list-content'>{ appItems }</div>
    ])
  })
})
