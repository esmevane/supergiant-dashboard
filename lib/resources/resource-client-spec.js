import { throwErrorUnless } from './resource-client'

describe("throwErrorUnless", () => {
  it(`throws if the status doesn't match`, () => {
    const checker = throwErrorUnless(200)
    const response = {
      response: { status: 202 },
      body: {}
    }

    expect(() => checker(response)).to.throw(Error)
  })

  it(`doesn't throw if the status matches`, () => {
    const checker = throwErrorUnless(200)
    const response = {
      response: { status: 200 },
      body: {}
    }

    expect(() => checker(response)).not.to.throw(Error)
  })

  it(`throws if given a list without a match`, () => {
    const checker = throwErrorUnless([200, 202])
    const response = {
      response: { status: 500 },
      body: {}
    }

    expect(() => checker(response)).to.throw(Error)
  })

  it(`doesn't throw if given a list with a match`, () => {
    const checker = throwErrorUnless([200, 202])
    const response = {
      response: { status: 202 },
      body: {}
    }

    expect(() => checker(response)).not.to.throw(Error)
  })
})
