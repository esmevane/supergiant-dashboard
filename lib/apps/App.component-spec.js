import Immutable from 'immutable'
import App from './App.component'
import { shallow } from 'enzyme'

describe(`App`, () => {
  const app = Immutable.fromJS({})
  const components = Immutable.fromJS([])
  const follow = () => console.log(`An on click event`)
  const newComponent = () => console.log(`Another on click event`)
  const props = { app, components, follow, newComponent }
  const element = shallow(<App { ...props } />)

  describe(`the Star`, () => {
    it(`exists`, () => expect(element.find(`Star`).length).to.equal(1))

    it(`passes follow to the Star`, () => {
      expect(element.find(`Star`).first().prop(`onClick`)).to.equal(follow)
    })
  })

  describe(`create new Component button`, () => {
    const query = element.find(`ActionButton`)
    const button = query.first()

    it(`exists`, () => expect(query.length).to.equal(1))

    it(`lets the Action Button handle newComponent`, () => {
      expect(button.prop(`onClick`)).to.equal(newComponent)
    })

    it(`sets isAction = true on the ActionButton`, () => {
      expect(button.prop(`isAction`)).to.equal(true)
    })
  })

  describe(`app components list`, () => {
    const query = element.find(`Connect(Components)`)
    const list = query.first()

    it(`exists`, () => expect(query.length).to.equal(1))
    it(`is handed the app`, () => expect(list.prop(`app`)).to.equal(app))
    it(`is handed components`, () => {
      expect(list.prop(`components`)).to.equal(components)
    })
  })

  describe(`Instance Stats`, () => {
    const query = element.find(`Connect(AppInstanceStats)`)
    const stats = query.first()

    it(`exists`, () => expect(query.length).to.equal(1))
    it(`is handed the app`, () => expect(stats.prop(`app`)).to.equal(app))
    it(`is handed components`, () => {
      expect(stats.prop(`components`)).to.equal(components)
    })
  })
})
