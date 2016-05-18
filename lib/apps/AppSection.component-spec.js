import AppSection from './AppSection.component'
import { shallow } from 'enzyme'

describe(`AppSection`, () => {
  const children = <div className='child div'/>
  const classes = `some extra classes`
  const element = shallow(
    <AppSection className={ classes }>
      { children }
    </AppSection>
  )

  it(`is a 'section.app'`, () => {
    expect(element.is(`section.app`)).to.eql(true)
  })

  it(`yields to given children`, () => {
    expect(element.find(`.child.div`).length).to.eql(1)
  })

  it(`yields to given classes`, () => {
    expect(element.is(`.some.extra.classes`)).to.eql(true)
  })

})
