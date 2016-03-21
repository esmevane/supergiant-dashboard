import React from 'react'
import { create } from '../shared/entities.behavior'
import ButtonLink from '../shared/ButtonLink.container'
import ComponentList from './ComponentList.component'

describe("components/ComponentList.component", () => {
  let app = create({ name: "Test app" })
  let appId = app.get('id')
  let child = <div className='unique test child' />
  let renderer = createRenderer()

  renderer.render(<ComponentList app={ app }>{child}</ComponentList>)

  let target = renderer.getRenderOutput()
  let [ header, content ] = target.props.children;

  it("is a section", () => { expect(target.type).to.eql('section') })
  it("has a header", () => { expect(header.type).to.eql('header') })
  it("has content", () => { expect(content.type).to.eql('div') })

  it(`uses a 'components-list' className`, () => {
    expect(target.props.className).to.eql('components-list')
  })

  it("provides a create components button link", () => {
    expect(header.props.children).to.eql(
      <ButtonLink ref='button' to={ `/apps/${appId}/components/new` } >
        Create a component
      </ButtonLink>
    )
  })

  it(`uses a 'components-list-main' className for section content`, () => {
    expect(content.props.className).to.eql('components-list-content')
  })

  it(`yields to passed-in content`, () => {
    expect(content.props.children).to.eql(child)
  })

})
