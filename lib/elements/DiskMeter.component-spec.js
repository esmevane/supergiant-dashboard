import DiskMeter from './DiskMeter.component'
import { floatFloorToPlaces } from '../shared/normalizers'

describe("DiskMeter", () => {
  describe("when limit is over 0", () => {
    const usage = 1234
    const limit = 10000
    const renderer = createRenderer()

    renderer.render(<DiskMeter usage={ usage } limit={ limit } />)

    const element = renderer.getRenderOutput()

    it("is a span", () => expect(element.type).to.equal(`span`))

    describe("child nodes", () => {
      const types = element.props.children.map(item => item.type)
      const [ meter, label, note ] = element.props.children

      describe("the meter", () => {
        it("is a StatusMeter", () => {
          expect(meter.type.name).to.eql('StatusMeter')
        })

        it("passes with-label-right as the className", () => {
          expect(meter.props.className).to.equal(`with-label-right`)
        })

        it("passes '1.21 Ki / 9.77 Ki disk used' as the title", () => {
          expect(meter.props.title).to.equal(`1.21 Ki / 9.77 Ki disk used`)
        })

        it("passes '1.234 CPU' as the detail", () => {
          expect(meter.props.detail).to.equal(`1.21 Ki`)
        })

        it("passes '12%' as the percentage", () => {
          expect(meter.props.percentage).to.equal(`12%`)
        })
      })

      describe("the label", () => {
        it("is a LabelRight", () => {
          expect(label.type.name).to.eql('LabelRight')
        })

        it("passes 'CPU' as the child node", () => {
          expect(label.props.children).to.equal(`Disk`)
        })
      })

    })
  })

})
