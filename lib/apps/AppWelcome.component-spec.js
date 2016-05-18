import AppWelcome from './AppWelcome.component'
import { shallow } from 'enzyme'

describe(`AppWelcome`, () => {
  const addApp = event => event.preventDefault()
  const element = shallow(<AppWelcome addApp={ addApp } />)

  it(`is a WelcomeMessage`, () => {
    expect(element.is(`WelcomeMessage`)).to.eql(true)
  })

  it(`passes the addApp function to an ActionButton`, () => {
    const button = element.find(`ActionButton`)

    expect(button.prop(`onClick`)).to.equal(addApp)
  })

})
