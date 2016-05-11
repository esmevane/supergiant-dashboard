import RamMeter from './RamMeter.component'
import { floatFloorToPlaces } from '../shared/normalizers'

const getWidth = (usage, limit) =>
  Math.round((usage / Math.max(limit || 1)) * 100)

describe("RamMeter", () => {
  describe("when limit is over 0", () => {
    const usage = 1234
    const limit = 10000
    const renderer = createRenderer()

    renderer.render(<RamMeter usage={ usage } limit={ limit } />)

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

        it("passes '1.21 Ki / 9.77 Ki RAM used' as the title", () => {
          expect(meter.props.title).to.equal(`1.21 Ki / 9.77 Ki RAM used`)
        })

        it("passes '12%' as the percentage", () => {
          expect(meter.props.percentage).to.equal(`12%`)
        })
      })

      describe("the label", () => {
        it("is a LabelRight", () => {
          expect(label.type.name).to.eql('LabelRight')
        })

        it("passes 'RAM' as the child node", () => {
          expect(label.props.children).to.equal(`RAM`)
        })
      })

      describe("the note", () => {
        it("has a TextNote", () => {
          expect(note.type.name).to.eql('TextNote')
        })

        it("passes 'row' as the className", () => {
          expect(note.props.className).to.equal(`row`)
        })

        it("gives '1.21 Ki used / 9.77 Ki RAM limit' as the child", () => {
          expect(note.props.children).to.equal(
            `1.21 Ki used / 9.77 Ki RAM limit`
          )
        })
      })
    })
  })

  describe("otherwise", () => {
    const usage = 1234
    const limit = 0
    const renderer = createRenderer()

    renderer.render(<RamMeter usage={ usage } limit={ limit } />)

    const element = renderer.getRenderOutput()

    it("is a div", () => expect(element.type).to.equal(`div`))
    it("is empty", () => expect(element.props.children).to.equal(undefined))
  })

})
