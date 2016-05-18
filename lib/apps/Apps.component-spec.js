import Apps from './Apps.component'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

describe(`Apps`, () => {
  const classes = `some extra classes`
  const invalidateCache = () => {}
  const apps = fromJS([])
  const addApp = () => console.log(`i go on a call to action yaaay`)
  const props = { apps, addApp, invalidateCache }
  const element = shallow(<Apps className={ classes } { ...props } />)

  it(`is an <AppDashboard />`, () => {
    expect(element.is(`AppDashboard`)).to.equal(true)
  })

  it(`yields to given classes`, () => {
    expect(element.is(`.some.extra.classes`)).to.equal(true)
  })

})
