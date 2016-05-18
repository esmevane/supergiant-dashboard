import AppForm from './AppForm.component'
import { shallow } from 'enzyme'

describe(`AppForm`, () => {
  const classes = `some extra classes`
  const submit = () => console.log(`a submit function yaaaay`)
  const name = {}
  const element = shallow(
    <AppForm className={ classes } submit={ submit } name={ name }/>
  )

  it(`is an <AppSection />`, () => {
    expect(element.is(`AppSection`)).to.equal(true)
  })

  it(`yields to given classes`, () => {
    expect(element.is(`.some.extra.classes`)).to.equal(true)
  })

  it(`creates a form`, () => {
    expect(element.find(`form`).length).to.equal(1)
  })

  it(`hands the submit function to the form`, () => {
    let form = element.find(`form`).first()

    expect(form.prop(`onSubmit`)).to.equal(submit)
  })

  it(`has one <FeedbackInput />`, () => {
    expect(element.find(`FeedbackInput`).length).to.equal(1)
  })

  it(`gives the name prop to the <FeedbackInput />`, () => {
    let input = element.find(`FeedbackInput`).first()
    expect(input.prop(`value`)).to.equal(name)
  })

  describe(`when there is a name value`, () => {
    const classes = `some extra classes`
    const submit = () => console.log(`a submit function yaaaay`)
    const name = { value: `My Brand New App` }
    const element = shallow(
      <AppForm className={ classes } submit={ submit } name={ name }/>
    )

    it(`displays the key form of the name`, () => {
      let preview = element.find(`.app-form-name-preview span`)

      expect(preview.text()).to.include(`my-brand-new-app`)
    })
  })

})
