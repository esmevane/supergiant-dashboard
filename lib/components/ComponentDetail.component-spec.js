import React from 'react'
import { create } from '../shared/entities.behavior'
import ButtonLink from '../shared/ButtonLink.container'
import ComponentDetail from './ComponentDetail.component'
import UpdateComponent from './UpdateComponent.container'
import { hexToRGBA } from './components.behavior'

describe("components/ComponentDetail.component", () => {
  let app = create({ name: "Test app" })
  let component = create({ name: "Test component" })
  let renderer = createRenderer()
  let backgroundColor = hexToRGBA(component.get('color'))

  renderer.render(<ComponentDetail app={ app } component={ component }/>)

  let target = renderer.getRenderOutput()
  let [ header, updateForm, footer ] = target.props.children;

  it("is an article", () => { expect(target.type).to.eql('article') })
  it("has a header", () => { expect(header.type).to.eql('header') })
  it("has a footer", () => { expect(footer.type).to.eql('footer') })

  it("has an update form", () => {
    expect(updateForm).to.eql(
      <UpdateComponent component={ component } />
    )
  })

  it(`uses a 'components-detail' className`, () => {
    expect(target.props.className).to.eql('components-detail')
  })

  it("displays the component name and id as a title", () => {
    expect(header.props.children).to.eql(
      <h2>Component { component.get('id') }</h2>
    )
  })

  it("provides back to app and back to dashboard buttons", () => {
    expect(footer.props.children).to.eql([
      <ButtonLink to={ `/apps/${app.get('id')}` }>Back to app</ButtonLink>,
      <ButtonLink to='/'>Back to Dashboard</ButtonLink>
    ])
  })
})
