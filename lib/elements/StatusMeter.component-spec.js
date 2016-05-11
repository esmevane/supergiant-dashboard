import StatusMeter from './StatusMeter.component'

describe("StatusMeter", () => {
  const percentage = '90%'
  const classes = 'some extra classes'
  const metricClasses = 'extra metric classes'
  const title = 'a cool title'
  const detail = 'an inner title'
  const renderer = createRenderer()

  renderer.render(
    <StatusMeter className={ classes }
                 detail={ detail }
                 title={ title }
                 metricClasses={ metricClasses }
                 percentage={ percentage } />
  )

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("permits a title", () => {
    expect(element.props.title).to.equal(title)
  })

  it("has a status-meter class", () => {
    expect(element.props.className).to.include(`status-meter`)
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  describe("metric interior", () => {
    const metric = element.props.children

    it("is a div", () => expect(metric.type).to.equal('div'))

    it("features the given detail", () => {
      expect(metric.props.title).to.equal(detail)
    })

    it("has a statis-metric class", () => {
      expect(metric.props.className).to.include('status-metric')
    })

    it("yields to given classes", () => {
      expect(metric.props.className).to.include(metricClasses)
    })
  })

})
