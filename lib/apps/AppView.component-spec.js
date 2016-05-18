import AppView from './AppView.component'
import { shallow } from 'enzyme'

describe(`AppView`, () => {
  const classes = `some extra classes`
  const opacity = `0.5`
  const app = { name: `appy-app-app` }
  const deleteApp = event => event.preventDefault()
  const element = shallow(
    <AppView app={ app }
             className={ classes }
             opacity={ opacity }
             deleteApp={ deleteApp } />
  )

  it(`is a 'div.app-view'`, () => {
    expect(element.is(`div.app-view`)).to.eql(true)
  })

  it(`displays the app name`, () => {
    const title = element.find(`ContextHeader ContextTitle`)

    expect(title.prop(`children`)).to.eq(app.name)
  })

  it(`passes the app to an App container`, () => {
    const container = element.find(`Connect(App)`)

    expect(container.prop(`app`)).to.equal(app)
  })

  it(`puts the deleteApp function in a DestroyButton`, () => {
    const button = element.find(`DestroyButton`)

    expect(button.prop(`onClick`)).to.equal(deleteApp)
  })

  it(`yields to given classes`, () => {
    expect(element.is(`.some.extra.classes`)).to.eql(true)
  })

})
