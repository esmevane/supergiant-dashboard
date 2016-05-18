import AppDashboard from './AppDashboard.component'
import { shallow } from 'enzyme'

describe(`AppDashboard`, () => {
  const children = <div className='child div'/>
  const classes = `some extra classes`
  const element = shallow(
    <AppDashboard className={ classes }>
      { children }
    </AppDashboard>
  )

  it(`is a 'section.application-dashboard'`, () => {
    expect(element.is(`section.application-dashboard`)).to.eql(true)
  })

  it(`yields to given children`, () => {
    expect(element.find(`.child.div`).length).to.eql(1)
  })

  it(`yields to given classes`, () => {
    expect(element.is(`.some.extra.classes`)).to.eql(true)
  })

})
