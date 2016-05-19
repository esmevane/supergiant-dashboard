import UIAddSubtract from './UIAddSubtract.component'

describe("UIAddSubtract", () => {
  const instanceNumber = 12
  const label          = 'name of thing'
  const classes        = 'some extra classes'
  const increase       = function() {}
  const decrease       = function() {}
  const renderer       = createRenderer()

  renderer.render(<UIAddSubtract subject={ instanceNumber }
                                 label={ 'instances' }
                                 increase={ increase }
                                 decrease={ decrease }
                                 className={ classes } />)

  const element = renderer.getRenderOutput()

  it("is a span", () => expect(element.type).to.equal('span'))

  it("has the addSubtractInt class", () => {
    expect(element.props.className).to.include(`addSubtractInt`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("should have props for subject, label, increase, and decrease", () => {
    expect(element.props.subject).to.be.defined
    expect(element.props.label).to.be.defined
    expect(element.props.increase).to.be.defined
    expect(element.props.decrease).to.be.defined
  })
})
