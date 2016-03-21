import React from 'react'
import { create } from '../shared/entities.behavior'
import { hexToRGBA } from './components.behavior'
import ComponentState from './ComponentState.component'

describe("components/ComponentState.component", () => {
  let app = create({ name: "Test app" })
  let component = create({ name: "Test component" })
  let renderer = createRenderer()
  let backgroundColor = hexToRGBA(component.get('color'))
  let submitted = false
  let submitter = () => submitted = true

  renderer.render(
    <ComponentState app={ app }
                    component={ component }
                    submit={ submitter }/>
  )

  let target = renderer.getRenderOutput()

  it(`is a section`, () => { expect(target.type).to.eql(`section`) })

  it(`uses a 'components-detail-main' className for section content`, () => {
    expect(target.props.className).to.eql('components-detail-main')
  })

  it(`has a form as section content`, () => {
    expect(target.props.children.type).to.eql(`form`)
  })
})
