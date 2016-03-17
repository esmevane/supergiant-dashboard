import Immutable from 'immutable'
import { create } from '../shared/entities.behavior'
import AppList from './AppList.component'
import ButtonLink from '../shared/ButtonLink.container'

describe("AppList.component", () => {
  let apps = Immutable.fromJS([create({ name: "Test app" })])
  let renderer = createRenderer()
  let appItems = apps.map(app => <div key={app}>{ app.get('name' ) }</div>)
  let onNew = () => ({})

  renderer.render(<AppList onNew={ onNew }>{ appItems }</AppList>)

  let component = renderer.getRenderOutput()

  it("is a section", () => { expect(component.type).to.eql('section') })

  it(`has an 'apps-list' className`, () => {
    expect(component.props.className).to.eql('apps-list')
  })

  it("has a title, a create app button, and list content", () => {
    expect(component.props.children).to.eql([
      <h2>Your apps</h2>,
      <ButtonLink ref='button' to='/apps/new'>Create an app</ButtonLink>,
      <div className='apps-list-content'>{ appItems }</div>
    ])
  })
})
