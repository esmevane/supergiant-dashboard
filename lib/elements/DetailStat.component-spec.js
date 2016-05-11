import DetailStat from './DetailStat.component'

describe("DetailStat", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <DetailStat className={ classes }>
      { children }
    </DetailStat>
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has an app-detail-stat class", () => {
    expect(element.props.className).to.include(`app-detail-stat`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
