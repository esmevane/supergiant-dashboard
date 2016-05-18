import AppDashboardContents from './AppDashboardContents.component'
import { shallow } from 'enzyme'

describe(`AppDashboardContents`, () => {
  const children = <div className='child div'/>
  const classes = `some extra classes`
  const element = shallow(
    <AppDashboardContents className={ classes }>
      { children }
    </AppDashboardContents>
  )

  it(`is a 'div.dashboard-apps'`, () => {
    expect(element.is(`div.dashboard-apps`)).to.eql(true)
  })

  it(`yields to given children`, () => {
    expect(element.find(`.child.div`).length).to.eql(1)
  })

  it(`yields to given classes`, () => {
    expect(element.is(`.some.extra.classes`)).to.eql(true)
  })

})
